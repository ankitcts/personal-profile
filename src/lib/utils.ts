import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function fmtRange(start: string, end: string): string {
  const fmt = (s: string): string => {
    if (s === 'Present') return 'Present';
    const [y, m] = s.split('-');
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    return `${months[Number(m) - 1] ?? m} ${y}`;
  };
  return `${fmt(start)} – ${fmt(end)}`;
}

export function durationYears(start: string, end: string): number {
  const s = new Date(start + '-01');
  const e = end === 'Present' ? new Date() : new Date(end + '-01');
  return (e.getTime() - s.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
}
