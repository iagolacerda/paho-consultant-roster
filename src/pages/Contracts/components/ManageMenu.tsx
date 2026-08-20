import React, { useRef, useState } from 'react';
import { Contract } from '../../../data/paho/mockContracts';
import { useModal } from '../../../hooks/useModal';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useTranslation } from '../../../i18n';
import { FeedbackModal } from '../../../components/FeedbackModal';
import { KebabIcon, LogoutIcon } from '../../../components/icons';
import { IconButton, ManageDropdown, ManageItem } from '../styles';

interface ManageMenuProps {
  contract: Contract;
}

export function ManageMenu({ contract }: ManageMenuProps) {
  const [open, setOpen] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);
  const feedbackModal = useModal();
  const { t } = useTranslation();

  useClickOutside(areaRef, () => setOpen(false), open);

  const terminateContract = () => {
    setOpen(false);
    feedbackModal.open(
      <FeedbackModal type="success" title={t('contracts.terminationRequestedTitle')} message={t('contracts.terminationRequestedMessage')} onClose={feedbackModal.close} />,
    );
  };

  return (
    <div ref={areaRef} style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
      <IconButton type="button" onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open} aria-label={t('contracts.manage')}>
        <KebabIcon />
      </IconButton>
      {open && (
        <ManageDropdown role="menu">
          <ManageItem type="button" role="menuitem" $danger onClick={terminateContract}>
            <LogoutIcon />
            {t('contracts.terminate')}
          </ManageItem>
        </ManageDropdown>
      )}
      {feedbackModal.portal}
    </div>
  );
}
