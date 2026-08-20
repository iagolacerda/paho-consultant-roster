import React from 'react';
import { HomeIcon, ProfileIcon, ApplicationsIcon, BriefcaseIcon, JobsIcon, ContractIcon } from './icons';

export interface NavLinkItem {
  to: string;
  labelKey: string;
  icon: React.ReactNode;
  end?: boolean;
}

// Itens de navegação principal — usados tanto na sidebar (telas largas)
// quanto no menu do usuário na navbar (telas estreitas, onde a sidebar
// some), para não manter duas listas divergentes. `labelKey` é resolvido
// via useTranslation() em NavList, não aqui (o idioma pode mudar depois).
export const NAV_LINKS: NavLinkItem[] = [
  { to: '/', labelKey: 'nav.home', icon: <HomeIcon />, end: true },
  { to: '/vagas', labelKey: 'nav.opportunities', icon: <JobsIcon /> },
  { to: '/candidaturas', labelKey: 'nav.applications', icon: <ApplicationsIcon /> },
  { to: '/contratacoes', labelKey: 'nav.contracts', icon: <ContractIcon /> },
  { to: '/perfil-profissional', labelKey: 'nav.professionalProfile', icon: <BriefcaseIcon /> },
];

// Conta (dados de login) — só aparece no menu do usuário na navbar, não na
// sidebar, que é reservada às telas de navegação principal.
export const PROFILE_LINK: NavLinkItem = { to: '/perfil', labelKey: 'navbar.myProfile', icon: <ProfileIcon /> };
