import React from 'react';
import styled from 'styled-components';
import { colors, radius } from '../../styles/tokens';

interface StatusConfig {
  bg: string;
  color: string;
}

interface Props {
  label: string;
  statusMap?: Record<string, StatusConfig>;
}

const StyledBadge = styled.span<{ $bg: string; $color: string }>`
  font-family: 'SF Pro Text', system-ui, -apple-system, sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  padding: 4px 10px;
  border-radius: ${radius.pill};
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
`;

const DEFAULT_STYLE: StatusConfig = { bg: colors.canvasParchment, color: colors.inkMuted80 };

export function Badge({ label, statusMap }: Props) {
  const style = statusMap?.[label] ?? DEFAULT_STYLE;
  return <StyledBadge $bg={style.bg} $color={style.color}>{label}</StyledBadge>;
}
