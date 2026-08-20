// React
import { Controller, useFormContext } from 'react-hook-form';
// Local
import { OptionList, Option, OptionText, OptionTitle, OptionDescription } from './styles';

export interface RadioOption {
  value: number;
  label: string;
  description?: string;
}

interface RadioOptionGroupProps {
  name: string;
  options: RadioOption[];
}

export function RadioOptionGroup({ name, options }: RadioOptionGroupProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <OptionList role="radiogroup">
          {options.map((opt) => {
            const active = field.value === opt.value;
            return (
              <Option key={opt.value} $active={active}>
                <input
                  type="radio"
                  name={field.name}
                  checked={active}
                  onChange={() => field.onChange(opt.value)}
                />
                <OptionText>
                  <OptionTitle>{opt.label}</OptionTitle>
                  {opt.description && <OptionDescription>{opt.description}</OptionDescription>}
                </OptionText>
              </Option>
            );
          })}
        </OptionList>
      )}
    />
  );
}
