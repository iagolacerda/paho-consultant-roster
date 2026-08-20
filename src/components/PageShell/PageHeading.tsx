import React from 'react';
import { BackButton } from '../Buttons';
import { PageHeader, TitleRow, PageHeaderIcon, PageTitle, PageSubtitle } from './styles';

interface PageHeadingProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  // Quando informado, mostra um botão de voltar no lugar do ícone da seção
  // (telas que não são um destino principal de navegação, ex.: perfil
  // profissional ou dados pessoais, acessadas a partir de outra tela).
  onBack?: () => void;
  backLabel?: string;
}

// Cabeçalho padrão de página: ícone da seção (ou botão de voltar) + título +
// descrição. Usado por toda página de nível principal (Home, Vagas,
// Candidaturas, Perfil) — telas com um layout de cabeçalho totalmente
// diferente (ex.: o detalhe de vaga, com badges no cabeçalho) compõem
// PageHeader/TitleRow diretamente.
export function PageHeading({ icon, title, subtitle, onBack, backLabel }: PageHeadingProps) {
  return (
    <PageHeader>
      <TitleRow>
        {onBack ? (
          <BackButton onClick={onBack} aria-label={backLabel}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </BackButton>
        ) : (
          <PageHeaderIcon>{icon}</PageHeaderIcon>
        )}
        <div>
          <PageTitle>{title}</PageTitle>
          {subtitle && <PageSubtitle>{subtitle}</PageSubtitle>}
        </div>
      </TitleRow>
    </PageHeader>
  );
}
