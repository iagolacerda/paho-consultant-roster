import React from 'react';
import { useTranslation, Language } from '../../i18n';
import { CompactSelect, Wrap } from './styles';

// Select padrão do projeto (components/Inputs), só num tamanho compacto —
// em vez de dois botões PT/EN, porque o app vai ganhar mais idiomas além
// desses dois e um toggle de 2 opções não escala para isso.
export function LanguageSwitch() {
  const { language, setLanguage } = useTranslation();

  return (
    <Wrap>
      <CompactSelect
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        aria-label="Language"
      >
        <option value="pt">Português</option>
        <option value="en">English</option>
      </CompactSelect>
    </Wrap>
  );
}
