import React from 'react';
import styled, { css } from 'styled-components';
import { colors, typography } from '../../styles/tokens';

export type TypographyType =
  | 'display'
  | 'tagline'
  | 'bodyStrong'
  | 'body'
  | 'caption'
  | 'captionStrong'
  | 'navLink'
  | 'finePrint';

// `size` só se aplica a type="display" (as duas escalas de título da PAHO:
// displayLg e displayMd) — os demais types já têm um único tamanho fixo.
export type TypographySize = 'lg' | 'md';

const DEFAULT_TAG: Record<TypographyType, React.ElementType> = {
  display: 'h1',
  tagline: 'h2',
  bodyStrong: 'p',
  body: 'p',
  caption: 'span',
  captionStrong: 'span',
  navLink: 'span',
  finePrint: 'span',
};

const TYPE_STYLES: Record<Exclude<TypographyType, 'display'>, ReturnType<typeof css>> = {
  tagline: css`${typography.tagline}`,
  bodyStrong: css`${typography.bodyStrong}`,
  body: css`${typography.body}`,
  caption: css`${typography.caption}`,
  captionStrong: css`${typography.captionStrong}`,
  navLink: css`${typography.navLink}`,
  finePrint: css`${typography.finePrint}`,
};

const DISPLAY_SIZE_STYLES: Record<TypographySize, ReturnType<typeof css>> = {
  lg: css`${typography.displayLg}`,
  md: css`${typography.displayMd}`,
};

const StyledText = styled.span<{ $type: TypographyType; $size: TypographySize; $color?: string }>`
  margin: 0;
  color: ${({ $color }) => $color ?? colors.ink};
  ${({ $type, $size }) => ($type === 'display' ? DISPLAY_SIZE_STYLES[$size] : TYPE_STYLES[$type])}
`;

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  type: TypographyType;
  size?: TypographySize;
  as?: React.ElementType;
  color?: string;
  children?: React.ReactNode;
}

// Componente único para todo texto do projeto — cada variante de `type`
// mapeia para um peso/família de fonte do design system
// (src/styles/tokens.ts) e uma tag HTML padrão sensata, trocável via `as`.
// `size` escolhe entre as duas escalas de título quando type="display".
export function Typography({ type, size = 'md', as, color, ...rest }: TypographyProps) {
  return <StyledText as={as ?? DEFAULT_TAG[type]} $type={type} $size={size} $color={color} {...rest} />;
}
