export const isEmail = (v: string) => /\S+@\S+\.\S+/.test(v);
export const isStrongPassword = (v: string) => v.length >= 6;

export function formatDateArabic(date: Date) {
  return new Intl.DateTimeFormat('ar-EG', { dateStyle: 'medium' }).format(date);
}

export const rtl = {
  textRight: { textAlign: 'right' as const },
  row: { flexDirection: 'row-reverse' as const },
};
