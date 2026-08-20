// React
import React from 'react';
// Components
import { useTranslation } from '../../i18n';
// Local
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
