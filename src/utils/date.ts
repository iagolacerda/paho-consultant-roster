// Components
import { Language } from '../i18n';

const LOCALE_BY_LANGUAGE: Record<Language, string> = {
  pt: 'pt-BR',
  en: 'en-US',
};

export function localeFor(language: Language): string {
  return LOCALE_BY_LANGUAGE[language];
}

function toDate(value: Date | string): Date {
  if (value instanceof Date) return value;
  const normalized = value.includes('T') ? value : `${value}T00:00:00`;
  return new Date(normalized);
}

export function formatDate(value: Date | string, language: Language, options?: Intl.DateTimeFormatOptions): string {
  return toDate(value).toLocaleDateString(localeFor(language), options);
}

export function formatTime(value: Date | string, language: Language, options?: Intl.DateTimeFormatOptions): string {
  return toDate(value).toLocaleTimeString(localeFor(language), { hour: '2-digit', minute: '2-digit', ...options });
}

export function formatDateTime(value: Date | string, language: Language, options?: Intl.DateTimeFormatOptions): string {
  return toDate(value).toLocaleString(localeFor(language), options);
}

// mm:ss, ou hh:mm:ss quando passa de uma hora — usado no tempo de sessão do rodapé.
export function formatDuration(totalSeconds: number): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}
