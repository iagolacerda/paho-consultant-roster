import styled from 'styled-components';
import { colors, radius, spacing, typography } from '../../../../styles/tokens';

export const RecordCard = styled.div`
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.md};
  padding: ${spacing.md};
  background: ${colors.surfacePearl};
  margin-bottom: ${spacing.md};
`;

export const RecordHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.sm};
`;

export const RecordTitle = styled.span`
  ${typography.captionStrong}
  color: ${colors.ink};
`;

export const RemoveButton = styled.button`
  ${typography.finePrint}
  background: none;
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.pill};
  padding: 4px 12px;
  color: ${colors.danger};
  cursor: pointer;

  &:hover {
    background: rgba(192, 57, 43, 0.06);
  }
`;

export const AddButton = styled.button`
  ${typography.caption}
  border: 1px dashed ${colors.bodyMuted};
  border-radius: ${radius.md};
  background: transparent;
  color: ${colors.primary};
  padding: ${spacing.sm};
  width: 100%;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: rgba(12, 59, 94, 0.06);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: transparent;
  }
`;

export const TextArea = styled.textarea`
  ${typography.body}
  width: 100%;
  min-height: 70px;
  resize: vertical;
  background: ${colors.canvasParchment};
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: ${radius.sm};
  padding: 10px 14px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: ${colors.primaryFocus};
    background: ${colors.canvas};
  }
`;
