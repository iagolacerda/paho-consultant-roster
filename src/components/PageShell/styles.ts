import styled from 'styled-components';
import { colors, spacing, typography } from '../../styles/tokens';

export const Page = styled.div`
  min-height: 100%;
  background: ${colors.canvasParchment};
  font-family: 'SF Pro Text', system-ui, -apple-system, sans-serif;
`;

export const Content = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.xxl} ${spacing.xl};

  @media (max-width: 720px) {
    padding: ${spacing.lg} ${spacing.md};
  }
`;

export const PageHeader = styled.div`
  margin-bottom: ${spacing.xl};
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
`;

export const PageTitle = styled.h1`
  ${typography.tagline}
  color: ${colors.ink};
  margin: 0 0 ${spacing.xs} 0;
`;

export const PageSubtitle = styled.p`
  ${typography.caption}
  color: ${colors.inkMuted48};
  margin: 0;
`;
