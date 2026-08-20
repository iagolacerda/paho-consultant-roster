// React
import React, { useRef, useState } from 'react';
// Components
import { useClickOutside } from '../../hooks/useClickOutside';
import { useTranslation, Language } from '../../i18n';
// Local
import { Wrap, Trigger, Chevron, Dropdown, OptionRow } from './styles';

const LANGUAGE_LABELS: Record<Language, string> = {
  pt: 'Português',
  en: 'English',
};

// Dropdown com aparência própria (não <select> nativo) — em vez de dois
// botões PT/EN, porque o app vai ganhar mais idiomas além desses dois e um
// toggle de 2 opções não escala para isso.
export function LanguageSwitch() {
  const { language, setLanguage } = useTranslation();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapRef, () => setOpen(false), open);

  const pick = (lang: Language) => {
    setLanguage(lang);
    setOpen(false);
  };

  return (
    <Wrap ref={wrapRef}>
      <Trigger type="button" onClick={() => setOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={open} aria-label="Language">
        {LANGUAGE_LABELS[language]}
        <Chevron $open={open} width="10" height="7" viewBox="0 0 10 7" fill="none">
          <path d="M1 1.5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </Chevron>
      </Trigger>
      {open && (
        <Dropdown role="listbox">
          {(Object.keys(LANGUAGE_LABELS) as Language[]).map((lang) => (
            <OptionRow key={lang} type="button" role="option" aria-selected={lang === language} $active={lang === language} onClick={() => pick(lang)}>
              {LANGUAGE_LABELS[lang]}
            </OptionRow>
          ))}
        </Dropdown>
      )}
    </Wrap>
  );
}
