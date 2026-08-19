import styled from 'styled-components';
import { colors, radius, spacing, typography } from '../../../styles/tokens';

export const UploadRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
`;

export const UploadButton = styled.label`
  ${typography.caption}
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.pill};
  padding: 8px 16px;
  cursor: pointer;
  color: ${colors.ink};
  background: ${colors.canvas};

  &:hover {
    background: ${colors.canvasParchment};
  }

  input {
    display: none;
  }
`;

export const FileName = styled.span`
  ${typography.caption}
  color: ${colors.ink};
`;

export const RemoveLink = styled.button`
  ${typography.finePrint}
  background: none;
  border: none;
  color: ${colors.danger};
  cursor: pointer;
  text-decoration: underline;
`;
