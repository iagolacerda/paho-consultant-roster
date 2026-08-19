import styled from 'styled-components';
import { spacing } from '../../styles/tokens';

export const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const FilterBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${spacing.lg};
`;
