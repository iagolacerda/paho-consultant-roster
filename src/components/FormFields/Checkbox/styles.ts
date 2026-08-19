import styled from 'styled-components';
import { colors, radius } from '../../../styles/tokens';

export const CheckboxWrap = styled.span`
  position: relative;
  display: inline-flex;
  flex: 0 0 auto;
  width: 18px;
  height: 18px;
  margin-top: 2px;
`;

export const HiddenInput = styled.input`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: pointer;
`;

// O estado marcado é aplicado via `style` inline no componente (não por
// classe dinâmica do styled-components) — o dev server deste projeto vinha
// deixando folhas de estilo antigas penduradas entre hot-reloads, e uma
// classe recém-gerada às vezes não vencia a cascata a tempo. Inline style
// sempre vence, então não depende disso.
export const Box = styled.span`
  width: 18px;
  height: 18px;
  border-radius: ${radius.xs};
  border: 1.5px solid ${colors.bodyMuted};
  background: ${colors.canvas};
  display: grid;
  place-items: center;
  pointer-events: none;
  transition: background 0.12s, border-color 0.12s;

  svg {
    opacity: 0;
    transition: opacity 0.1s;
  }

  ${HiddenInput}:focus-visible + & {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }
`;
