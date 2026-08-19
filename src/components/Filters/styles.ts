import styled from 'styled-components';
import { colors, spacing, typography } from '../../styles/tokens';

export const FilterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  height: 100%;
`;

export const FieldStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
  flex: 1;
`;

export const FieldLabel = styled.label`
  ${typography.captionStrong}
  color: ${colors.inkMuted80};
  display: flex;
  flex-direction: column;
  gap: ${spacing.xxs};
`;

export const FilterActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${spacing.md};
  border-top: 1px solid ${colors.dividerSoft};
`;

export const ErrorText = styled.p`
  ${typography.caption}
  color: #c0392b;
  margin: 0;
`;
