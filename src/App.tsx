// React
import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
// Libs
import styled from 'styled-components';
// Local
import { Footer, FOOTER_HEIGHT } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { I18nProvider } from './i18n';
import { Applications } from './pages/Applications';
import { ConsultantProfile } from './pages/ConsultantProfile';
import { Contracts } from './pages/Contracts';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Opportunities } from './pages/Opportunities';
import { OpportunityDetail } from './pages/OpportunityDetail';
import { PersonalInfo } from './pages/PersonalInfo';
import { Profile } from './pages/Profile';
import { GlobalStyle } from './styles/global';

const AppRoot = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Shell = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
`;

const MainArea = styled.div`
  flex: 1;
  min-width: 0;
  height: 100%;
  overflow-y: auto;
  // Reserva espaço para o rodapé global fixo (Footer) não cobrir o fim do
  // conteúdo scrollável de nenhuma página.
  padding-bottom: ${FOOTER_HEIGHT}px;
`;

// Layout do app autenticado: navbar + sidebar fixos, só o conteúdo rola.
// A tela de login (sem navbar/sidebar) fica fora desse layout.
function AppShell() {
  return (
    <AppRoot>
      <Navbar />
      <Shell>
        <Sidebar />
        <MainArea>
          <Outlet />
        </MainArea>
      </Shell>
      <Footer />
    </AppRoot>
  );
}

function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<AppShell />}>
            <Route path="/" element={<Home />} />
            <Route path="/vagas" element={<Opportunities />} />
            <Route path="/oportunidades/:id" element={<OpportunityDetail />} />
            <Route path="/candidaturas" element={<Applications />} />
            <Route path="/contratacoes" element={<Contracts />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/perfil/dados-pessoais" element={<PersonalInfo />} />
            <Route path="/perfil-profissional" element={<ConsultantProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  );
}

export default App;
