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
{
    id: 'report-teal-premium',
    name: 'أخضر التقرير (الفاخر)',
    // مستوحى من كلاس .teal-surface
    headerGradient: 'linear-gradient(160deg, #1f6a68 0%, #124a4a 48%, #0a2f30 100%)',
    darkAccent: '#0a2f30',    // --color-teal-950
    primaryBorder: '#c39a41', // --color-gold-500
    labelColor: '#0c3b3c',    // --color-teal-900
    titleBorder: '#d8b661',   // --color-gold-400
    btnBg: '#217874',         // --color-teal-600
    swatches: ['#0a2f30', '#217874', '#c39a41', '#e7cf8e'],
  },
  {
    id: 'report-paper-gold',
    name: 'الكلاسيكي الذهبي',
    // مستوحى من كلاس .gold-surface
    headerGradient: 'linear-gradient(180deg, #f6e6b4 0%, #e7cf8e 14%, #c99f43 46%, #a9812f 74%, #8a6620 100%)',
    darkAccent: '#0c3b3c',    // --color-teal-900
    primaryBorder: '#124a4a', // --color-teal-800
    labelColor: '#1a5c5b',    // --color-teal-700
    titleBorder: '#c39a41',   // --color-gold-500
    btnBg: '#c39a41',         // --color-gold-500
    // الألوان: لون الورق، ذهبي أساسي، أخضر التقرير، والأخضر الداكن
    swatches: ['#efe9db', '#c39a41', '#217874', '#0a2f30'],
  },
  {
    id: 'report-signature-soft',
    name: 'التقرير الرسمي (أخضر وذهبي ناعم)',
    headerGradient: 'linear-gradient(160deg, #1f6a68 0%, #124a4a 48%, #0a2f30 100%)',
    darkAccent: '#071f20',    
    primaryBorder: '#c39a41', 
    labelColor: '#0c3b3c',    
    titleBorder: '#e7cf8e',   
    btnBg: '#124a4a',         
    swatches: ['#efe9db', '#e7cf8e', '#124a4a', '#0a2f30'],
  }
];