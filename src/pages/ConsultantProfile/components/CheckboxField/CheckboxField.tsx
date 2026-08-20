// React
import React from 'react';
import { useFormContext } from 'react-hook-form';
// Components
import { Checkbox } from '../../../../components/FormFields/Checkbox/Checkbox';
import { colors } from '../../../../styles/tokens';
import { Option, OptionText, OptionTitle, OptionDescription } from '../RadioOptionGroup/styles';

interface CheckboxFieldProps {
  name: string;
  label: string;
  description?: string;
  warn?: boolean;
}

export function CheckboxField({ name, label, description, warn }: CheckboxFieldProps) {
  const { register, watch } = useFormContext();
  const checked = Boolean(watch(name));

  return (
    <Option
      $active={warn ? checked : undefined}
      style={warn && checked ? { borderColor: colors.danger, background: colors.dangerSurface } : undefined}
    >
      <Checkbox {...register(name)} checked={checked} />
      <OptionText>
        <OptionTitle>{label}</OptionTitle>
        {description && <OptionDescription>{description}</OptionDescription>}
      </OptionText>
    </Option>
  );
}
