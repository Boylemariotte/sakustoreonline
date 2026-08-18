export const DEFAULT_THEME = {
  name: 'SAKU',
  accent: '#C4714C',
  ink: '#2B2118',
  cream: '#FAF5EC',
  logo: '/saku-logo.png',
};

const THEME_KEY = 'saku.theme';

export function rawTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || '';
  } catch {
    return '';
  }
}

export function readTheme() {
  try {
    return Object.assign({}, DEFAULT_THEME, JSON.parse(rawTheme() || '{}'));
  } catch {
    return Object.assign({}, DEFAULT_THEME);
  }
}
