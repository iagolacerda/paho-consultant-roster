import styled from 'styled-components';
import { colors, radius, typography } from '../../../styles/tokens';

export const Brand = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
  ${typography.bodyStrong}
  color: ${colors.ink};
  white-space: nowrap;
`;

export const BrandMark = styled.span`
  width: 30px;
  height: 30px;
  border-radius: ${radius.sm};
  background: ${colors.primary};
  flex: 0 0 30px;
`;

export const BrandText = styled.span`
  @media (max-width: 380px) {
    display: none;
  }
`;
