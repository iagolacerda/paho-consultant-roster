// React
import React, { useEffect, useState } from 'react';
// Components
import { useTranslation } from '../../i18n';
import { formatDateTime, formatDuration } from '../../utils/date';
// Local
import { Bar, SessionInfo, Clock } from './styles';

const SESSION_STARTED_AT = Date.now();
const SESSION_DURATION_SECONDS = 30 * 60;

export function Footer() {
  const { t, language } = useTranslation();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const elapsedSeconds = Math.floor((now.getTime() - SESSION_STARTED_AT) / 1000);
  const remainingSeconds = Math.max(0, SESSION_DURATION_SECONDS - elapsedSeconds);

  return (
    <Bar>
      <SessionInfo>{t('footer.session')}: {formatDuration(remainingSeconds)}</SessionInfo>
      <Clock>{formatDateTime(now, language)}</Clock>
    </Bar>
  );
}
