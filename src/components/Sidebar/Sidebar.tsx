import React from 'react';
import { NavList } from '../NavList';
import { SidebarShell } from './styles';

export function Sidebar() {
  return (
    <SidebarShell>
      <NavList />
    </SidebarShell>
  );
}
