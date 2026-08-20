// Libs
import styled from 'styled-components';
// Components
import { SectionCard } from '../../../components/FormFields';
import { media, spacing } from '../../../styles/tokens';

export const DashboardStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
`;

export const CardFoot = styled.div`
  margin-top: ${spacing.md};
  text-align: center;
`;

export const ProfileCard = styled(SectionCard)`
  display: flex;
  flex-direction: column;
`;

export const OpportunitiesCard = styled(SectionCard)`
  display: flex;
  flex-direction: column;
`;

export const ViewAllRow = styled.div`
  margin-top: ${spacing.md};
  text-align: center;
`;

// O carrossel de cards fixos de 300px não cabe bem em mobile/tablet — abaixo
// desse breakpoint mostra a lista empilhada (MobileOpportunityList) no lugar.
export const CarouselWrap = styled.div`
  ${media.lg} {
    display: none;
  }
`;

export const MobileOpportunityList = styled.div`
  display: none;

  ${media.lg} {
    display: flex;
    flex-direction: column;
  }
`;
