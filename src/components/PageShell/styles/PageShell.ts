// Libs
import styled from 'styled-components';
// Components
import { colors, radius, spacing, typography } from '../../../styles/tokens';

export const Page = styled.div`
  min-height: 100%;
  background: ${colors.canvasParchment};
  font-family: 'SF Pro Text', system-ui, -apple-system, sans-serif;
`;

export const Content = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.xl} ${spacing.lg};

  @media (max-width: 720px) {
    padding: ${spacing.md} ${spacing.sm};
  }
`;

export const PageHeader = styled.div`
  margin-bottom: ${spacing.lg};
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.md};
`;

export const PageHeaderIcon = styled.span`
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  border-radius: ${radius.md};
  background: ${colors.primary};
  color: ${colors.onPrimary};
  display: grid;
  place-items: center;

  svg {
    width: 22px;
    height: 22px;
  }
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
