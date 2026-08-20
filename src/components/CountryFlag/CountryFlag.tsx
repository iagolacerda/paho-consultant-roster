// React
import React from 'react';
// Local
import { FlagIcon, FlagPlaceholder } from './styles';

interface CountryFlagProps {
  code?: string; // ISO 3166-1 alpha-2, minúsculo (ver data/paho/countryFlags.ts)
  label?: string;
  size?: number;
}

// Bandeira de verdade (SVG via lib flag-icons), não emoji — só usa a classe
// fi-XX (background-image) da lib, o tamanho/moldura é todo nosso, pra não
// disputar especificidade com o CSS deles.
export function CountryFlag({ code, label, size }: CountryFlagProps) {
  if (!code) return <FlagPlaceholder $size={size} aria-hidden />;
  return <FlagIcon className={`fi-${code}`} $size={size} role="img" aria-label={label ?? code} title={label} />;
}
