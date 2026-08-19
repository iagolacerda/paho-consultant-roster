import React, { useEffect, useRef, useState } from 'react';
import {
  Wrapper, Trigger, TriggerText, Popover, Header, MonthLabel, NavButton, Grid, Weekday, Day,
} from './styles';

export interface DateRange {
  from: string;
  to: string;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  placeholder?: string;
}

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

const pad = (n: number) => String(n).padStart(2, '0');
const toISO = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromISO = (s: string) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};
const formatBR = (s: string) => {
  const [y, m, d] = s.split('-');
  return `${d}/${m}/${y}`;
};

export function DateRangePicker({ value, onChange, placeholder = 'Selecione o período' }: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => {
    const base = value.from ? fromISO(value.from) : new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const y = view.getFullYear();
  const m = view.getMonth();
  const firstWeekday = new Date(y, m, 1).getDay();
  const days = Array.from({ length: 42 }, (_, i) => new Date(y, m, 1 - firstWeekday + i));

  const pick = (iso: string) => {
    if (!value.from || value.to) {
      onChange({ from: iso, to: '' });
    } else if (iso < value.from) {
      onChange({ from: iso, to: '' });
    } else {
      onChange({ from: value.from, to: iso });
      setOpen(false);
    }
  };

  const label = value.from
    ? `${formatBR(value.from)} — ${value.to ? formatBR(value.to) : '…'}`
    : placeholder;

  return (
    <Wrapper ref={ref}>
      <Trigger type="button" onClick={() => setOpen((o) => !o)}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M2 6h12M5 1.5v3M11 1.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <TriggerText $placeholder={!value.from}>{label}</TriggerText>
      </Trigger>

      {open && (
        <Popover>
          <Header>
            <NavButton type="button" aria-label="Mês anterior" onClick={() => setView(new Date(y, m - 1, 1))}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L6 8l4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </NavButton>
            <MonthLabel>{MONTHS[m]} {y}</MonthLabel>
            <NavButton type="button" aria-label="Próximo mês" onClick={() => setView(new Date(y, m + 1, 1))}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l4 5-4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </NavButton>
          </Header>

          <Grid>
            {WEEKDAYS.map((w) => <Weekday key={w}>{w}</Weekday>)}
            {days.map((d) => {
              const iso = toISO(d);
              const selected = iso === value.from || iso === value.to;
              const inRange = !!value.from && !!value.to && iso > value.from && iso < value.to;
              return (
                <Day
                  key={iso}
                  type="button"
                  $muted={d.getMonth() !== m}
                  $selected={selected}
                  $inRange={inRange}
                  onClick={() => pick(iso)}
                >
                  {d.getDate()}
                </Day>
              );
            })}
          </Grid>
        </Popover>
      )}
    </Wrapper>
  );
}
