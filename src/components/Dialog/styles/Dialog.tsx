// Libs
import styled from 'styled-components';
// Components
import { colors, spacing, typography } from '../../../styles/tokens';

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const Message = styled.p`
  ${typography.body}
  color: ${colors.inkMuted80};
  margin: 0;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${spacing.xs};
  margin-top: ${spacing.xs};
`;

export const ErrorText = styled.p`
  ${typography.caption}
  color: ${colors.danger};
  margin: 0;
`;
