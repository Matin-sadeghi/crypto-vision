export const colors = {
  primary: 'var(--color-primary)',
  primary50: 'var(--color-primary-50)',
  secondary: 'var(--color-secondary)',
  tertiary: 'var(--color-tertiary)',
  tertiary100: 'var(--color-tertiary-100)',
  tertiary200: 'var(--color-tertiary-200)',
  tertiary50: 'var(--color-tertiary-50)',
  success: 'var(--color-success)',
  success200: 'var(--color-success-200)',
  warning: 'var(--color-warning)',
  warning200: 'var(--color-warning-200)',
  danger200: 'var(--color-danger-200)',
  danger: 'var(--color-danger)',
  info: 'var(--color-info)',
  info200: 'var(--color-info-200)',

  white: 'var(--color-white)',
  black: 'var(--color-black)',

  textPrimary: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  textMuted: 'var(--color-text-muted)',
  textMuted200: 'var(--color-text-muted-200)',
  textMuted300: 'var(--color-text-muted-300)',
  textHeading: 'var(--color-text-heading)',
  textInverse: 'var(--color-text-inverse)',
  textYellowBtn: 'var(--color-text-yellow-btn)',

  border: 'var(--color-border)',
  background: 'var(--color-background)',
  cardBackground: 'var(--color-card-background)',
  sidebarBackground: 'var(--color-sidebar-background)',
  tableHeaderBackground: 'var(--color-table-header-background)',
  iconSurface: 'var(--color-icon-surface)',

  borderCard: 'var(--border-card)',
  shadowCard: 'var(--shadow-card)',
} as const;

export type ColorType = keyof typeof colors;
