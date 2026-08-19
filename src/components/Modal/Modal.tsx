import React from 'react';
import { Overlay, Panel, ModalHeader, ModalTitle, CloseButton, ModalBody, ModalPosition } from './styles';

interface ModalProps {
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: ModalPosition;
}

export function Modal({ onClose, title, children, position = 'right' }: ModalProps) {
  return (
    <Overlay $position={position} onClick={onClose}>
      <Panel $position={position} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose} aria-label="Fechar">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </CloseButton>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </Panel>
    </Overlay>
  );
}
