import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FilterForm, FieldStack, FieldLabel, FilterActions, ErrorText } from './styles';
import { Input, Select, DateRangePicker } from '../Inputs';
import { Button } from '../Buttons';
import { filtersSchema, EMPTY_FILTERS, FilterValues } from './schema';

export { EMPTY_FILTERS };
export type { FilterValues };

export interface StatusOption {
  value: string;
  label: string;
}

export type StatusField =
  | { locked: string }
  | { options: ReadonlyArray<StatusOption> };

interface FiltersProps {
  defaultValues?: FilterValues;
  onSearch: (values: FilterValues) => void;
  onClear: () => void;
  status: StatusField;
}

export function Filters({ defaultValues, onSearch, onClear, status }: FiltersProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FilterValues>({
    resolver: zodResolver(filtersSchema),
    defaultValues: defaultValues ?? EMPTY_FILTERS,
  });

  const dateFrom = watch('dateFrom');
  const dateTo = watch('dateTo');

  const handleClear = () => {
    reset(EMPTY_FILTERS);
    onClear();
  };

  return (
    <FilterForm onSubmit={handleSubmit(onSearch)}>
      <FieldStack>
        <FieldLabel>
          Cliente
          <Input placeholder="Buscar por cliente" {...register('client')} />
        </FieldLabel>

        <FieldLabel>
          Passageiro
          <Input placeholder="Buscar por passageiro" {...register('traveller')} />
        </FieldLabel>

        <FieldLabel>
          Status
          {'locked' in status ? (
            <Select defaultValue={status.locked} disabled>
              <option>{status.locked}</option>
            </Select>
          ) : (
            <Select {...register('status')}>
              <option value="">Todos</option>
              {status.options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </Select>
          )}
        </FieldLabel>

        <FieldLabel>
          Período
          <DateRangePicker
            value={{ from: dateFrom, to: dateTo }}
            onChange={({ from, to }) => {
              setValue('dateFrom', from, { shouldValidate: true });
              setValue('dateTo', to, { shouldValidate: true });
            }}
          />
          {errors.dateTo && <ErrorText>{errors.dateTo.message}</ErrorText>}
        </FieldLabel>
      </FieldStack>

      <FilterActions>
        <Button type="button" $variant="ghost" onClick={handleClear}>Limpar</Button>
        <Button type="submit" $variant="primary">Aplicar filtros</Button>
      </FilterActions>
    </FilterForm>
  );
}
