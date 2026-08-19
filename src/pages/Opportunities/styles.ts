import styled from 'styled-components';
import { media, spacing } from '../../styles/tokens';

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${spacing.md};

  ${media.xs} {
    grid-template-columns: 1fr;
  }
`;
