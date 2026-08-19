export const colors = {
  primary: '#0c3b5e',
  primaryFocus: '#092c47',
  primaryOnDark: '#5b8fb5',
  ink: '#1d1d1f',
  inkMuted80: '#333333',
  inkMuted48: '#7a7a7a',
  bodyMuted: '#cccccc',
  dividerSoft: '#f0f0f0',
  hairline: '#e0e0e0',
  canvas: '#ffffff',
  canvasParchment: '#f5f5f7',
  surfacePearl: '#fafafc',
  surfaceTile1: '#272729',
  surfaceBlack: '#000000',
  onPrimary: '#ffffff',
  onDark: '#ffffff',
  danger: '#c0392b',
  dangerSurface: '#fbeae8',
  success: '#1e824c',
} as const;

// Breakpoints únicos do projeto — usados tanto nos `@media` do
// styled-components (via `media` abaixo) quanto no hook useBreakpoint
// (src/hooks/useBreakpoint.ts, sobre react-responsive) para lógica em JS.
export const breakpoints = {
  xs: 480,
  sm: 720,
  md: 860,
  lg: 1024,
} as const;

export const media = {
  xs: `@media (max-width: ${breakpoints.xs}px)`,
  sm: `@media (max-width: ${breakpoints.sm}px)`,
  md: `@media (max-width: ${breakpoints.md}px)`,
  lg: `@media (max-width: ${breakpoints.lg}px)`,
} as const;

export const radius = {
  none: '0px',
  xs: '5px',
  sm: '8px',
  md: '11px',
  lg: '18px',
  pill: '9999px',
} as const;

export const spacing = {
  xxs: '4px',
  xs: '8px',
  sm: '12px',
  md: '17px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
  section: '80px',
} as const;

export const typography = {
  displayLg: `
    font-family: 'SF Pro Display', system-ui, -apple-system, sans-serif;
    font-size: 40px;
    font-weight: 600;
    line-height: 1.1;
    letter-spacing: 0;
  `,
  displayMd: `
    font-family: 'SF Pro Display', system-ui, -apple-system, sans-serif;
    font-size: 34px;
    font-weight: 600;
    line-height: 1.47;
    letter-spacing: -0.374px;
  `,
  tagline: `
    font-family: 'SF Pro Display', system-ui, -apple-system, sans-serif;
    font-size: 21px;
    font-weight: 600;
    line-height: 1.19;
    letter-spacing: 0.231px;
  `,
  bodyStrong: `
    font-family: 'SF Pro Text', system-ui, -apple-system, sans-serif;
    font-size: 17px;
    font-weight: 600;
    line-height: 1.24;
    letter-spacing: -0.374px;
  `,
  body: `
    font-family: 'SF Pro Text', system-ui, -apple-system, sans-serif;
    font-size: 17px;
    font-weight: 400;
    line-height: 1.47;
    letter-spacing: -0.374px;
  `,
  caption: `
    font-family: 'SF Pro Text', system-ui, -apple-system, sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.43;
    letter-spacing: -0.224px;
  `,
  captionStrong: `
    font-family: 'SF Pro Text', system-ui, -apple-system, sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.29;
    letter-spacing: -0.224px;
  `,
  navLink: `
    font-family: 'SF Pro Text', system-ui, -apple-system, sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.0;
    letter-spacing: -0.12px;
  `,
  finePrint: `
    font-family: 'SF Pro Text', system-ui, -apple-system, sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 1.0;
    letter-spacing: -0.12px;
  `,
} as const;
