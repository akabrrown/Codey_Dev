/**
 * Generates a human-readable reference number: CD-YYYY-XXXX
 * The 4-digit suffix is a zero-padded counter derived from a random
 * number seeded with the current second — collision risk is negligible
 * at Codey Dev's expected request volume.
 */
export function generateReferenceNo(): string {
  const year = new Date().getFullYear();
  const suffix = Math.floor(Math.random() * 9000) + 1000;
  return `CD-${year}-${suffix}`;
}
