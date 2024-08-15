import { I18nManager } from 'react-native';
export const isRTL = I18nManager.isRTL;

const translations = {
  en: {
    madeby: 'Made by',
    change: 'Change language to Arabic',
    input: 'Enter text here',
    reset: 'Reset language',
    twitter: 'Twitter',
  },
  ar: {
    madeby: 'صنع بواسطة',
    change: 'تغيير اللغة إلى الإنجليزية',
    reset: 'إعادة تعيين اللغة',
    input: 'أدخل النص هنا',
    twitter: 'تويتر',
  },
};

export const language = translations[isRTL ? 'ar' : 'en'];
