import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { colors, radius, typography } from '../../styles/tokens';

export const NavItem = styled(NavLink)`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: ${radius.sm};
  ${typography.caption}
  font-weight: 600;
  color: ${colors.inkMuted48};
  text-decoration: none;
  margin-bottom: 2px;

  &:hover {
    background: ${colors.canvasParchment};
    color: ${colors.ink};
  }

  &.active {
    background: rgba(12, 59, 94, 0.1);
    color: ${colors.primaryFocus};
  }
`;

export const NavIcon = styled.span`
  width: 18px;
  display: grid;
  place-items: center;
  flex: 0 0 18px;
`;
