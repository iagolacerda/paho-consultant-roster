// Libs
import styled from 'styled-components';
// Components
import { colors, radius, typography } from '../../../styles/tokens';

// Dropdown com aparência própria (não <select> nativo) — mesma linguagem
// visual de ChipMultiSelect/CountrySelect: gatilho arredondado + cartão
// flutuante com opções espaçadas, em vez do popup nativo do navegador.
export const Wrap = styled.div`
  position: relative;
  width: 96px;
  flex: 0 0 auto;
`;

export const Trigger = styled.button`
  ${typography.finePrint}
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  width: 100%;
  height: 32px;
  padding: 0 10px;
  background: ${colors.canvasParchment};
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: ${radius.pill};
  color: ${colors.ink};
  cursor: pointer;
  transition: border-color 0.15s;

  &:focus, &:hover {
    border-color: ${colors.primaryFocus};
    background: ${colors.canvas};
  }
`;

export const Chevron = styled.svg<{ $open?: boolean }>`
  flex: 0 0 auto;
  color: ${colors.inkMuted48};
  transform: rotate(${({ $open }) => ($open ? '180deg' : '0deg')});
  transition: transform 0.15s;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: ${colors.canvas};
  border: 1px solid ${colors.hairline};
  border-radius: ${radius.md};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 6px;
  z-index: 40;
`;

export const OptionRow = styled.button<{ $active?: boolean }>`
  display: block;
  width: 100%;
  text-align: left;
  background: ${({ $active }) => ($active ? colors.canvasParchment : 'none')};
  border: none;
  border-radius: ${radius.xs};
  padding: 7px 10px;
  ${typography.caption}
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${colors.ink};
  cursor: pointer;

  &:hover {
    background: ${colors.canvasParchment};
  }
`;
