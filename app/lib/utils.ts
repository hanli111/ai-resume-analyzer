// Utility to format a byte size into a human-readable string (KB, MB, GB)
// Uses binary units (1 KB = 1024 bytes) and rounds to 0–2 decimals depending on magnitude.
import {twMerge} from "tailwind-merge";
import clsx, {type ClassValue} from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))  // 'inputs' now contains all arguments
}
export function formatSize(bytes: number): string {
  if (!isFinite(bytes) || bytes <= 0) return "0 KB";

  const units = ["KB", "MB", "GB"] as const;
  let size = bytes / 1024; // start at KB as requested
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  // Formatting: fewer decimals for larger numbers
  const formatted = size >= 100
    ? Math.round(size).toString()
    : size >= 10
      ? size.toFixed(1)
      : size.toFixed(2);

  return `${formatted} ${units[unitIndex]}`;
}

export const generateUUID = () => crypto.randomUUID();
export default formatSize;
