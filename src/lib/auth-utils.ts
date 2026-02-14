import { NextRequest } from "next/server";
import { supabaseAdmin } from "./supabase";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export interface AdminSession {
  id: string;
  email: string;
  role: "super_admin" | "admin" | "editor";
  is_active: boolean;
}

export interface SessionResult {
  success: boolean;
  admin?: AdminSession;
  error?: string;
}

/**
 * Verify admin session from JWT token in cookies or Authorization header
 */
export async function verifyAdminSession(request: NextRequest): Promise<SessionResult> {
  try {
    // Get token from cookie or Authorization header
    const cookieToken = request.cookies.get("admin_token")?.value;
    const authHeader = request.headers.get("authorization");
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;
    
    const token = cookieToken || bearerToken;

    if (!token) {
      return { success: false, error: "No authentication token provided" };
    }

    // Verify JWT token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return { success: false, error: "Invalid or expired token" };
    }

    // Check if session exists in database
    const { data: session, error: sessionError } = await supabaseAdmin
      .from("admin_sessions")
      .select("*")
      .eq("token", token)
      .eq("is_active", true)
      .gt("expires_at", new Date().toISOString())
      .single();

    if (sessionError || !session) {
      return { success: false, error: "Session expired or invalid" };
    }

    // Get admin details
    const { data: admin, error: adminError } = await supabaseAdmin
      .from("admins")
      .select("id, email, role, is_active")
      .eq("id", decoded.adminId)
      .eq("is_active", true)
      .single();

    if (adminError || !admin) {
      return { success: false, error: "Admin not found or inactive" };
    }

    // Update last activity
    await supabaseAdmin
      .from("admin_sessions")
      .update({ last_activity: new Date().toISOString() })
      .eq("id", session.id);

    return {
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
        is_active: admin.is_active,
      },
    };
  } catch (error) {
    console.error("[v0] Session verification error:", error);
    return { success: false, error: "Internal authentication error" };
  }
}

/**
 * Check if admin has required role
 */
export function checkAdminRole(
  admin: AdminSession,
  requiredRoles: Array<"super_admin" | "admin" | "editor">
): boolean {
  return requiredRoles.includes(admin.role);
}

/**
 * Create JWT token for admin
 */
export function createAdminToken(adminId: string, email: string): string {
  return jwt.sign(
    {
      adminId,
      email,
      type: "admin",
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

/**
 * Generate secure random token for OTP/reset
 */
export function generateSecureToken(length: number = 32): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  
  for (let i = 0; i < length; i++) {
    token += chars[array[i] % chars.length];
  }
  
  return token;
}

/**
 * Generate OTP code
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
