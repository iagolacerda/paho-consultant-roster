import React from 'react';
import { StyledSelect } from './styles';

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>((props, ref) => (
  <StyledSelect ref={ref} {...props} />
));

Select.displayName = 'Select';
