import styled from 'styled-components';
import { colors, radius, spacing } from '../../styles/tokens';

export const Wrap = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  gap: ${spacing.sm};
`;

export const Track = styled.div`
  display: flex;
  gap: ${spacing.md};
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  flex: 1;
  min-width: 0;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Item = styled.div`
  flex: 0 0 300px;
  scroll-snap-align: start;
`;

export const NavButton = styled.button`
  flex: 0 0 44px;
  width: 44px;
  height: 44px;
  align-self: center;
  border-radius: ${radius.pill};
  border: 1px solid ${colors.hairline};
  background: ${colors.canvas};
  color: ${colors.ink};
  cursor: pointer;
  display: grid;
  place-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  transition: border-color 0.12s, color 0.12s, box-shadow 0.12s;

  &:hover:not(:disabled) {
    border-color: ${colors.primary};
    color: ${colors.primary};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    opacity: 0.35;
    cursor: default;
    box-shadow: none;
  }
`;
