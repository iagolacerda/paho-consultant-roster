// React
import React, { useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
// Components
import { useClickOutside } from '../../../hooks/useClickOutside';
// Local
import { Wrap, Trigger, TriggerLabel, Dropdown, OptionRow } from './styles';

export interface SelectOption {
  value: string | number;
  label: string;
}

interface SharedProps {
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  // Opção vazia selecionável (ex.: "Prefiro não informar"), além do
  // placeholder — que por si só nunca é uma opção clicável.
  emptyLabel?: string;
  emptySelectable?: boolean;
}

interface SelectDropdownProps extends SharedProps {
  value: string | number | undefined;
  onChange: (value: string | number | undefined) => void;
}

// Dropdown com aparência própria (não <select> nativo) — mesma linguagem
// visual de CountrySelect/LanguageSwitch/ChipMultiSelect, para todos os
// selects padrão do app terem popup consistente e estilizável.
function SelectDropdown({ value, onChange, options, placeholder, disabled, emptyLabel, emptySelectable }: SelectDropdownProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapRef, () => setOpen(false), open);

  const selected = options.find((o) => o.value === value);

  const pick = (v: string | number | undefined) => {
    onChange(v);
    setOpen(false);
  };

  return (
    <Wrap ref={wrapRef}>
      <Trigger
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <TriggerLabel $placeholder={!selected}>{selected ? selected.label : placeholder}</TriggerLabel>
      </Trigger>
      {open && (
        <Dropdown role="listbox">
          {emptySelectable && (
            <OptionRow type="button" role="option" $active={value === undefined} onClick={() => pick(undefined)}>
              {emptyLabel}
            </OptionRow>
          )}
          {options.map((o) => (
            <OptionRow
              key={o.value}
              type="button"
              role="option"
              aria-selected={o.value === value}
              $active={o.value === value}
              onClick={() => pick(o.value)}
            >
              {o.label}
            </OptionRow>
          ))}
        </Dropdown>
      )}
    </Wrap>
  );
}

interface FormSelectProps extends SharedProps {
  name: string;
}

function FormSelect({ name, ...rest }: FormSelectProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <SelectDropdown value={field.value} onChange={field.onChange} {...rest} />}
    />
  );
}

export type SelectProps =
  | ({ name: string; value?: undefined; onChange?: undefined } & SharedProps)
  | ({ name?: undefined; value: string | number | undefined; onChange: (value: string | number | undefined) => void } & SharedProps);

export function Select(props: SelectProps) {
  if (props.name) {
    const { name, value: _value, onChange: _onChange, ...rest } = props;
    return <FormSelect name={name} {...rest} />;
  }
  const { name: _name, value, onChange, ...rest } = props as Extract<SelectProps, { name?: undefined }>;
  return <SelectDropdown value={value} onChange={onChange} {...rest} />;
}
