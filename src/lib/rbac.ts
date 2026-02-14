import { AdminSession } from "./auth-utils";

// Define permissions for each role
export const PERMISSIONS = {
  super_admin: [
    "products.create",
    "products.read",
    "products.update",
    "products.delete",
    "orders.create",
    "orders.read",
    "orders.update",
    "orders.delete",
    "customers.read",
    "customers.update",
    "customers.delete",
    "admins.create",
    "admins.read",
    "admins.update",
    "admins.delete",
    "analytics.read",
    "audit_logs.read",
    "settings.update",
  ],
  admin: [
    "products.create",
    "products.read",
    "products.update",
    "products.delete",
    "orders.read",
    "orders.update",
    "customers.read",
    "customers.update",
    "analytics.read",
  ],
  editor: [
    "products.read",
    "products.update",
    "orders.read",
    "customers.read",
    "analytics.read",
  ],
};

/**
 * Check if admin has specific permission
 */
export function hasPermission(admin: AdminSession, permission: string): boolean {
  const rolePermissions = PERMISSIONS[admin.role] || [];
  return rolePermissions.includes(permission);
}

/**
 * Check if admin has any of the specified permissions
 */
export function hasAnyPermission(admin: AdminSession, permissions: string[]): boolean {
  return permissions.some((permission) => hasPermission(admin, permission));
}

/**
 * Check if admin has all of the specified permissions
 */
export function hasAllPermissions(admin: AdminSession, permissions: string[]): boolean {
  return permissions.every((permission) => hasPermission(admin, permission));
}

/**
 * Get all permissions for an admin
 */
export function getAdminPermissions(admin: AdminSession): string[] {
  return PERMISSIONS[admin.role] || [];
}
