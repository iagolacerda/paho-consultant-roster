// React
import React from 'react';
// Components
import { useTranslation } from '../../i18n';
// Local
import { Overlay, Panel, ModalHeader, ModalTitle, CloseButton, ModalBody, ModalPosition } from './styles';

interface ModalProps {
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: ModalPosition;
}

export function Modal({ onClose, title, children, position = 'right' }: ModalProps) {
  const { t } = useTranslation();
  return (
    <Overlay $position={position} onClick={onClose}>
      <Panel $position={position} onClick={(e) => e.stopPropagation()}>
        {title ? (
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <CloseButton onClick={onClose} aria-label={t('common.close')}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
              </svg>
            </CloseButton>
          </ModalHeader>
        ) : (
          <CloseButton onClick={onClose} aria-label={t('common.close')} $floating>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M14 4L4 14M4 4l10 10" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </CloseButton>
        )}
        <ModalBody>{children}</ModalBody>
      </Panel>
    </Overlay>
  );
}
