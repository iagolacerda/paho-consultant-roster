import styled from 'styled-components';
import { media, spacing } from '../../styles/tokens';
import { SectionCard } from '../../components/FormFields';

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: ${spacing.lg};
  align-items: stretch;

  ${media.md} {
    grid-template-columns: 1fr;
  }
`;

export const CardFoot = styled.div`
  margin-top: ${spacing.md};
  text-align: center;
`;

export const ViewAllLink = styled.div`
  padding: ${spacing.sm} ${spacing.md};
  text-align: center;
  margin-top: auto;
`;

// Vagas é o principal motivo de alguém visitar a home — vem primeiro e com
// um pouco mais de largura que o card de perfil.
export const FeaturedCard = styled(SectionCard)`
  display: flex;
  flex-direction: column;
`;
