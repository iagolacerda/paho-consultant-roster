import styled from 'styled-components';
import { media, spacing } from '../../styles/tokens';

export const FilterBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${spacing.md};
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${spacing.md};

  ${media.xs} {
    grid-template-columns: 1fr;
  }
`;

export const FilterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${spacing.sm};
  margin-top: ${spacing.lg};
`;
