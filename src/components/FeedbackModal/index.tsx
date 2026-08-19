import React from 'react';
import { Modal } from '../Modal';
import styled from 'styled-components';
import { colors, spacing, typography, radius } from '../../styles/tokens';
import { Button } from '../Buttons';

export type FeedbackType = 'success' | 'error';

export interface FeedbackModalProps {
  onClose: () => void;
  type: FeedbackType;
  title: string;
  message?: string;
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${spacing.lg} 0;
  gap: ${spacing.md};
`;

const IconCircle = styled.div<{ $type: FeedbackType }>`
  width: 64px;
  height: 64px;
  border-radius: ${radius.pill};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ $type }) => $type === 'success' ? '#d1fae5' : '#fee2e2'};
  color: ${({ $type }) => $type === 'success' ? '#065f46' : '#991b1b'};
  flex-shrink: 0;
`;

const Title = styled.p`
  ${typography.bodyStrong}
  color: ${colors.ink};
  margin: 0;
`;

const Message = styled.p`
  ${typography.body}
  color: ${colors.inkMuted48};
  margin: 0;
`;

function SuccessIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M6 14l6 6L22 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 9v6M14 19h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );
}

export function FeedbackModal({ onClose, type, title, message }: FeedbackModalProps) {
  return (
    <Modal onClose={onClose} title="" position="center">
      <Body>
        <IconCircle $type={type}>
          {type === 'success' ? <SuccessIcon /> : <ErrorIcon />}
        </IconCircle>
        <Title>{title}</Title>
        {message && <Message>{message}</Message>}
        <Button $variant="primary" onClick={onClose}>Fechar</Button>
      </Body>
    </Modal>
  );
}
