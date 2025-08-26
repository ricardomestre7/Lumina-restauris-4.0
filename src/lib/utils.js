import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString, includeTime = false) {
  if (!dateString) return "Data não disponível";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Data inválida";
    }
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    if (includeTime) {
      options.hour = '2-digit';
      options.minute = '2-digit';
    }
    return date.toLocaleDateString('pt-BR', options);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Erro na data";
  }
}

export function calculateAge(birthDateString) {
  if (!birthDateString) return null;
  const birthDate = new Date(birthDateString);
  if (isNaN(birthDate.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function exportToCSV(data, filename = 'export.csv') {
  if (!data || data.length === 0) {
    console.warn("No data to export.");
    return;
  }

  const replacer = (key, value) => value === null || value === undefined ? '' : String(value).replace(/"/g, '""');
  
  const allKeys = new Set();
  data.forEach(row => Object.keys(row).forEach(key => allKeys.add(key)));
  const header = Array.from(allKeys);

  let csvRows = data.map(row => header.map(fieldName => `"${replacer(fieldName, row[fieldName])}"`).join(','));
  csvRows.unshift(header.join(','));
  const csvString = csvRows.join('\r\n');

  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } else {
    console.error("CSV download not supported by this browser.");
  }
}

export const phaseDetails = {
  1: { name: "Fase 1: Liberação", description: "Foco na liberação de bloqueios energéticos e emocionais primários." },
  2: { name: "Fase 2: Regeneração", description: "Estímulo aos processos naturais de cura e regeneração do corpo e da mente." },
  3: { name: "Fase 3: Equilíbrio", description: "Harmonização dos sistemas corporais e campos energéticos." },
  4: { name: "Fase 4: Vitalidade", description: "Aumento da energia vital, clareza mental e bem-estar geral." },
  5: { name: "Fase 5: Integração", description: "Integração das mudanças e fortalecimento da resiliência." },
  6: { name: "Fase 6: Autonomia", description: "Desenvolvimento da autoconsciência e autonomia na manutenção da saúde." },
};

export const getPhaseName = (phaseNumber) => {
  return phaseDetails[phaseNumber]?.name || `Fase ${phaseNumber}`;
};

export const getPhaseDescription = (phaseNumber) => {
  return phaseDetails[phaseNumber]?.description || "Descrição não disponível.";
};