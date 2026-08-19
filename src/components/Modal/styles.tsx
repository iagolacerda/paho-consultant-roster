import styled, { css } from 'styled-components';
import { colors, radius, spacing, typography } from '../../styles/tokens';

export type ModalPosition = 'left' | 'right' | 'center';

const overlayAlign: Record<ModalPosition, ReturnType<typeof css>> = {
  left: css`justify-content: flex-start; align-items: stretch;`,
  right: css`justify-content: flex-end; align-items: stretch;`,
  center: css`justify-content: center; align-items: center;`,
};

const panelVariant: Record<ModalPosition, ReturnType<typeof css>> = {
  left: css`
    width: 400px;
    max-width: 90vw;
    height: 100%;
    box-shadow: 8px 0 24px rgba(0, 0, 0, 0.12);
  `,
  right: css`
    width: 400px;
    max-width: 90vw;
    height: 100%;
    box-shadow: -8px 0 24px rgba(0, 0, 0, 0.12);
  `,
  center: css`
    width: 480px;
    max-width: 90vw;
    max-height: 85vh;
    border-radius: ${radius.lg};
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.18);
  `,
};

export const Overlay = styled.div<{ $position: ModalPosition }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  z-index: 1000;
  ${({ $position }: { $position: ModalPosition }) => overlayAlign[$position]}
`;

export const Panel = styled.div<{ $position: ModalPosition }>`
  background: ${colors.canvas};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  ${({ $position }: { $position: ModalPosition }) => panelVariant[$position]}
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.lg};
  border-bottom: 1px solid ${colors.hairline};
  flex-shrink: 0;
`;

export const ModalTitle = styled.span`
  ${typography.bodyStrong}
  color: ${colors.ink};
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: ${colors.inkMuted48};
  border-radius: ${radius.sm};
  cursor: pointer;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: ${colors.canvasParchment};
    color: ${colors.ink};
  }
`;

export const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${spacing.lg};
`;
