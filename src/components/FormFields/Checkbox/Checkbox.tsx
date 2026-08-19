import React from 'react';
import { colors } from '../../../styles/tokens';
import { CheckboxWrap, HiddenInput, Box } from './styles';

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

// Substitui o checkbox nativo (aparência inconsistente entre navegadores)
// por uma caixa desenhada — o input real fica presente e funcional, só
// visualmente escondido, então leitores de tela e navegação por teclado
// continuam funcionando normalmente. O estado marcado/desmarcado vem de
// `checked` (passe-o explicitamente mesmo usando react-hook-form's
// `register`, já que register() sozinho não expõe o valor atual).
export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(({ checked, ...props }, ref) => (
  <CheckboxWrap>
    <HiddenInput type="checkbox" checked={checked} ref={ref} {...props} />
    <Box
      aria-hidden
      style={checked ? { background: colors.primary, borderColor: colors.primary } : undefined}
    >
      <svg width="11" height="9" viewBox="0 0 11 9" fill="none" style={{ opacity: checked ? 1 : 0 }}>
        <path d="M1 4.5 4 7.5 10 1.5" stroke={colors.onPrimary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Box>
  </CheckboxWrap>
));

Checkbox.displayName = 'Checkbox';
