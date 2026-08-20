import React from 'react';
import { useTranslation } from '../../i18n';
import { PaginationBar, PaginationInfo, PaginationControls, PageButton, Ellipsis } from './styles';

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

function buildPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | '...')[] = [1];

  if (current > 3) pages.push('...');

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push('...');
  pages.push(total);

  return pages;
}

export function Pagination({ page, totalPages, total, pageSize, onPageChange }: PaginationProps) {
  const { t } = useTranslation();
  if (totalPages <= 1) return null;

  const effectiveTotal = Math.max(totalPages, 1);
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const pages = buildPages(page, effectiveTotal);

  return (
    <PaginationBar>
      <PaginationInfo>
        {from}–{to} {t('common.of')} {total} {total === 1 ? t('common.item') : t('common.items')}
      </PaginationInfo>

      <PaginationControls>
        <PageButton
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          aria-label={t('pagination.previousPage')}
        >
          ‹
        </PageButton>

        {pages.map((p, i) =>
          p === '...' ? (
            <Ellipsis key={`ellipsis-${i}`}>…</Ellipsis>
          ) : (
            <PageButton
              key={p}
              $active={p === page}
              onClick={() => p !== page && onPageChange(p)}
            >
              {p}
            </PageButton>
          )
        )}

        <PageButton
          disabled={page === effectiveTotal}
          onClick={() => onPageChange(page + 1)}
          aria-label={t('pagination.nextPage')}
        >
          ›
        </PageButton>
      </PaginationControls>
    </PaginationBar>
  );
}
