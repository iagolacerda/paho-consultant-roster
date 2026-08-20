// React
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// Local
import { TabBar, TabItem } from './styles';

interface Tab {
  label: string;
  path: string;
}

interface TabsProps {
  tabs: Tab[];
}

export function Tabs({ tabs }: TabsProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <TabBar>
      {tabs.map((tab) => (
        <TabItem
          key={tab.path}
          $active={pathname === tab.path || (tab.path !== '/faturas' && pathname.startsWith(tab.path))}
          onClick={() => navigate(tab.path)}
        >
          {tab.label}
        </TabItem>
      ))}
    </TabBar>
  );
}
