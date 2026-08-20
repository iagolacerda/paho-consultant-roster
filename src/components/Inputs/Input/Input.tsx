// React
import React from 'react';
// Local
import { StyledInput } from './styles';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <StyledInput ref={ref} {...props} />
));

Input.displayName = 'Input';
