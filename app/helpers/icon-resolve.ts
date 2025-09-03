export default function resolveIcon(icon?: string): string {
  if (icon && icon.startsWith('http')) return icon;
  return '/icons/default.svg';
}
