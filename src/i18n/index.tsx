// React
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
// Components
import en from '../translations/en.json';
import pt from '../translations/pt.json';

export type Language = 'pt' | 'en';

const RESOURCES: Record<Language, unknown> = { pt, en };

function resolve(dict: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, segment) => {
    if (acc && typeof acc === 'object' && segment in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[segment];
    }
    return undefined;
  }, dict);
}

function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => (key in vars ? String(vars[key]) : match));
}

interface I18nContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

// Tradução própria, sem lib externa (react-i18next foi removido a pedido).
// Só cobre o que este projeto precisa: chave com ponto, interpolação
// {{var}} e troca de idioma em memória (pt/en).
export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const value = resolve(RESOURCES[language], key) ?? resolve(RESOURCES.pt, key);
      if (typeof value !== 'string') return key;
      return interpolate(value, vars);
    },
    [language],
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used within I18nProvider');
  return ctx;
}
