// React
import React from 'react';
// Components
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { Brand } from '../Brand';
import { LanguageSwitch } from '../LanguageSwitch';
// Local
import { Bar, Spacer } from './styles';
import { UserMenu } from './UserMenu';

// No mobile a sidebar some, então o botão de usuário abre um menu em tela
// cheia com navegação + idioma + sair; no desktop a sidebar já cobre isso,
// então aqui fica só marca + idioma.
export function Navbar() {
  const { isMd } = useBreakpoint();

  return (
    <Bar>
      <Brand />
      <Spacer />
      {!isMd && <LanguageSwitch />}
      {isMd && <UserMenu />}
    </Bar>
  );
}
