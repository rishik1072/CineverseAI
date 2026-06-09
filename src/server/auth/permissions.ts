export function canModerate(role?: string | null) {
  return role === "ADMIN" || role === "MODERATOR";
}

export function isAdmin(role?: string | null) {
  return role === "ADMIN";
}
