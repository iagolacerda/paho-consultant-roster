import styled from 'styled-components';
import { colors, media, radius, spacing, typography } from '../../styles/tokens';

export const Screen = styled.div`
  height: 100vh;
  display: flex;

  ${media.md} {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
`;

export const BrandPanel = styled.div`
  flex: 1 1 45%;
  background: ${colors.primary};
  color: ${colors.onPrimary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${spacing.xxl};

  ${media.md} {
    flex: 0 0 auto;
    min-height: 52vh;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: ${spacing.xl};
  }
`;

export const BrandMarkLg = styled.span`
  width: 44px;
  height: 44px;
  border-radius: ${radius.sm};
  background: ${colors.onPrimary};
  display: block;
  margin-bottom: ${spacing.md};
`;

export const BrandName = styled.p`
  ${typography.tagline}
  color: ${colors.onPrimary};
  margin: 0 0 ${spacing.sm};
`;

export const BrandTagline = styled.p`
  ${typography.body}
  color: ${colors.primaryOnDark};
  margin: 0;
  max-width: 380px;

  ${media.md} {
    display: none;
  }
`;

// No mobile o formulário vira um "bottom sheet": puxado para cima por
// cima do painel colorido, com as bordas de cima arredondadas.
export const FormPanel = styled.div`
  flex: 1 1 55%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.xxl};

  ${media.md} {
    flex: 1;
    align-items: flex-start;
    background: ${colors.canvas};
    border-radius: ${radius.lg} ${radius.lg} 0 0;
    margin-top: -28px;
    position: relative;
    z-index: 1;
    padding: ${spacing.xl} ${spacing.md};
  }
`;

export const FormBox = styled.div`
  width: 100%;
  max-width: 380px;
`;

export const FormTitle = styled.h1`
  ${typography.displayMd}
  color: ${colors.ink};
  margin: 0 0 ${spacing.xl};

  ${media.md} {
    ${typography.tagline}
  }
`;

export const Field = styled.div`
  margin-bottom: ${spacing.md};
`;

export const FieldLabel = styled.label`
  ${typography.captionStrong}
  color: ${colors.ink};
  display: block;
  margin-bottom: 6px;
`;

export const ErrorText = styled.p`
  ${typography.finePrint}
  color: ${colors.danger};
  margin: 4px 0 0;
`;

export const RememberRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin-bottom: ${spacing.xl};
  ${typography.caption}
  color: ${colors.ink};
`;

export const SubmitButton = styled.button`
  ${typography.bodyStrong}
  width: 100%;
  background: ${colors.ink};
  color: ${colors.onDark};
  border: none;
  border-radius: ${radius.sm};
  padding: 14px;
  cursor: pointer;

  &:hover {
    background: ${colors.inkMuted80};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
