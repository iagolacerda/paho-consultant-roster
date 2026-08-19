import { z } from 'zod';

export const filtersSchema = z
  .object({
    client: z.string(),
    traveller: z.string(),
    status: z.string(),
    dateFrom: z.string(),
    dateTo: z.string(),
  })
  .refine((v) => !v.dateFrom || !v.dateTo || v.dateFrom <= v.dateTo, {
    message: 'A data inicial não pode ser maior que a final',
    path: ['dateTo'],
  });

export type FilterValues = z.infer<typeof filtersSchema>;

export const EMPTY_FILTERS: FilterValues = {
  client: '',
  traveller: '',
  status: '',
  dateFrom: '',
  dateTo: '',
};
