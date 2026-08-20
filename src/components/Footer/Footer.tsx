import React, { useEffect, useState } from 'react';
import { useTranslation } from '../../i18n';
import { formatDateTime, formatDuration } from '../../utils/date';
import { Bar, SessionInfo, Clock } from './styles';

// Mock: marca o carregamento do app como início da sessão — não há
// autenticação real neste projeto ainda (ver mockSession.ts).
const SESSION_STARTED_AT = Date.now();

export function Footer() {
  const { t, language } = useTranslation();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const sessionSeconds = Math.floor((now.getTime() - SESSION_STARTED_AT) / 1000);

  return (
    <Bar>
      <SessionInfo>{t('footer.session')}: {formatDuration(sessionSeconds)}</SessionInfo>
      <Clock>{formatDateTime(now, language)}</Clock>
    </Bar>
  );
}
