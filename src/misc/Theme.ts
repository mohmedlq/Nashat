export type Theme = {
  id: string;
  name: string;
  headerGradient: string;
  darkAccent: string;
  primaryBorder: string;
  labelColor: string;
  titleBorder: string;
  btnBg: string;
  swatches: string[];
};

export const PRESET_THEMES: Theme[] = [
  {
    id: 'emerald-teal',
    name: 'الأخضر التعليمي (الافتراضي)',
    headerGradient: 'linear-gradient(to left, #34d399, #14b8a6, #0ea5e9)',
    darkAccent: '#0f3d3e',
    primaryBorder: '#14b8a6',
    labelColor: '#0d9488',
    titleBorder: '#2dd4bf',
    btnBg: '#0d9488',
    swatches: ['#34d399', '#14b8a6', '#0ea5e9', '#0f3d3e'],
  },
  {
    id: 'royal-navy',
    name: 'الكحلي والذهبي الملكي',
    headerGradient: 'linear-gradient(to left, #0f172a, #1e3a8a, #2563eb)',
    darkAccent: '#0b1220',
    primaryBorder: '#3b82f6',
    labelColor: '#b45309',
    titleBorder: '#f59e0b',
    btnBg: '#b45309',
    swatches: ['#0f172a', '#1e3a8a', '#f59e0b', '#0b1220'],
  },
  {
    id: 'burgundy-luxury',
    name: 'العنابي الدافئ',
    headerGradient: 'linear-gradient(to left, #6b21a8, #9f1239, #be123c)',
    darkAccent: '#3f0a1c',
    primaryBorder: '#be123c',
    labelColor: '#9f1239',
    titleBorder: '#fb7185',
    btnBg: '#9f1239',
    swatches: ['#6b21a8', '#9f1239', '#be123c', '#3f0a1c'],
  },
  {
    id: 'amber-gold',
    name: 'الذهبي الكهرماني',
    headerGradient: 'linear-gradient(to left, #b45309, #d97706, #f59e0b)',
    darkAccent: '#4a2c05',
    primaryBorder: '#d97706',
    labelColor: '#b45309',
    titleBorder: '#fbbf24',
    btnBg: '#b45309',
    swatches: ['#b45309', '#d97706', '#f59e0b', '#4a2c05'],
  },
  {
    id: 'slate-formal',
    name: 'الرمادي الرسمي',
    headerGradient: 'linear-gradient(to left, #334155, #475569, #64748b)',
    darkAccent: '#1e293b',
    primaryBorder: '#64748b',
    labelColor: '#475569',
    titleBorder: '#94a3b8',
    btnBg: '#475569',
    swatches: ['#334155', '#475569', '#64748b', '#1e293b'],
  },
  {
    id: 'sky-calm',
    name: 'الأزرق السماوي الهادئ',
    headerGradient: 'linear-gradient(to left, #0369a1, #0284c7, #38bdf8)',
    darkAccent: '#0c3450',
    primaryBorder: '#0284c7',
    labelColor: '#0369a1',
    titleBorder: '#7dd3fc',
    btnBg: '#0369a1',
    swatches: ['#0369a1', '#0284c7', '#38bdf8', '#0c3450'],
  },
  {
    id: 'olive-classic',
    name: 'الزيتوني التقليدي',
    headerGradient: 'linear-gradient(to left, #3f6212, #4d7c0f, #65a30d)',
    darkAccent: '#1a2e05',
    primaryBorder: '#4d7c0f',
    labelColor: '#3f6212',
    titleBorder: '#84cc16',
    btnBg: '#3f6212',
    swatches: ['#3f6212', '#4d7c0f', '#65a30d', '#1a2e05'],
  },
];