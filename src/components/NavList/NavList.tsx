import React from 'react';
import { NAV_LINKS, NavLinkItem } from '../navLinks';
import { useTranslation } from '../../i18n';
import { NavItem, NavIcon } from './styles';

interface NavListProps {
  items?: NavLinkItem[];
  onNavigate?: () => void;
}

// Lista de navegação renderizada tanto na sidebar (telas largas) quanto no
// menu do usuário na navbar (onde a sidebar não aparece). Recebe `items`
// para poder mostrar sublistas diferentes (ex.: só "Meu perfil") a partir
// dos mesmos componentes.
export function NavList({ items = NAV_LINKS, onNavigate }: NavListProps) {
  const { t } = useTranslation();

  return (
    <>
      {items.map((item) => (
        <NavItem key={item.to} to={item.to} end={item.end} onClick={onNavigate}>
          <NavIcon>{item.icon}</NavIcon>
          <span>{t(item.labelKey)}</span>
        </NavItem>
      ))}
    </>
  );
}
