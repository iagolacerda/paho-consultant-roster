// React
import React from 'react';
// Components
import { CURRENT_USER } from '../../data/paho/mockSession';
import { PROFILE_LINK } from '../navLinks';
import { NavList } from '../NavList';
// Local
import { SidebarShell, SidebarTop, SidebarDivider, UserRow, Avatar, UserName } from './styles';

// No desktop as informações do usuário e o link para "Meu perfil" ficam
// sempre visíveis aqui — sem dropdown, sem clique a mais (ver Navbar.tsx
// para o equivalente no mobile, que precisa de um menu por falta de espaço).
export function Sidebar() {
  return (
    <SidebarShell>
      <SidebarTop>
        <UserRow>
          <Avatar>{CURRENT_USER.initials}</Avatar>
          <UserName>{CURRENT_USER.firstName}</UserName>
        </UserRow>
        <NavList items={[PROFILE_LINK]} />
      </SidebarTop>
      <SidebarDivider />
      <NavList />
    </SidebarShell>
  );
}
