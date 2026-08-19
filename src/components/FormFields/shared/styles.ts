import styled from 'styled-components';
import { colors, radius, spacing, typography } from '../../../styles/tokens';

export const SectionCard = styled.section`
  background: ${colors.canvas};
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.lg};
  padding: ${spacing.lg};
  margin-bottom: ${spacing.lg};
`;

export const SectionTitle = styled.h2`
  ${typography.tagline}
  color: ${colors.ink};
  margin: 0 0 4px;
`;

export const SectionDescription = styled.p`
  ${typography.caption}
  color: ${colors.inkMuted48};
  margin: 0 0 ${spacing.md};
  line-height: 1.5;
`;

export const FieldGrid = styled.div<{ $cols?: 1 | 2 | 3 }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols = 2 }) => $cols}, 1fr);
  gap: ${spacing.md};

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

export const FieldStack = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 0;
`;

export const FieldLabel = styled.span`
  ${typography.captionStrong}
  color: ${colors.ink};
`;

export const RequiredMark = styled.span`
  color: ${colors.danger};
  margin-left: 2px;
`;

export const HintText = styled.p`
  ${typography.finePrint}
  color: ${colors.inkMuted48};
  margin: 2px 0 0;
`;

export const ErrorText = styled.p`
  ${typography.finePrint}
  color: ${colors.danger};
  margin: 2px 0 0;
`;

export const CharCount = styled.span<{ $short?: boolean }>`
  ${typography.finePrint}
  color: ${({ $short }) => ($short ? colors.danger : colors.inkMuted48)};
  margin-top: 2px;
  display: block;
  text-align: right;
`;
