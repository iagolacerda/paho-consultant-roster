import React from 'react';
import { useTranslation, Language } from '../../i18n';
import { LangSelect } from './styles';

// Select em vez de dois botões PT/EN — o app vai ganhar mais idiomas além
// desses dois, e um toggle de 2 opções não escala para isso.
export function LanguageSwitch() {
  const { language, setLanguage } = useTranslation();

  return (
    <LangSelect
      value={language}
      onChange={(e) => setLanguage(e.target.value as Language)}
      aria-label="Language"
    >
      <option value="pt">Português</option>
      <option value="en">English</option>
    </LangSelect>
  );
}
