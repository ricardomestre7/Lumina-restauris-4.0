import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// formatDate foi movida para utils.js para consolidação e para evitar conflitos.
// calculateAge está em utils.js
// exportToCSV está em utils.js
// phaseDetails, getPhaseName, getPhaseDescription estão em utils.js