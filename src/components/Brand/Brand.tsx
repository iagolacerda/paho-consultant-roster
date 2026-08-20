import React from 'react';
import { useTranslation } from '../../i18n';
import { Brand as BrandWrap, BrandMark, BrandText } from './styles';

export function Brand() {
  const { t } = useTranslation();
  return (
    <BrandWrap>
      <BrandMark />
      <BrandText>{t('navbar.brand')}</BrandText>
    </BrandWrap>
  );
}
