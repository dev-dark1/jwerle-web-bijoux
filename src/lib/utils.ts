
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import crypto from "crypto";

// UI helper
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Password helpers
export async function hashPassword(password: string) {
  const bcrypt = await import("bcryptjs");
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string) {
  const bcrypt = await import("bcryptjs");
  return bcrypt.compare(password, hash);
}

// OTP generator
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// SHA256
export function hashOTP(otp: string) {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

// Device hash
export function simpleHash(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}
