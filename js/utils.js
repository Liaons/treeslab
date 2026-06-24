/**
 * Truncates text to maxLength, appending '...' if cut.
 * Returns '' for null/undefined/non-string inputs (canonical implementation —
 * trees-common.js and equipe.html had diverging behaviour for these cases).
 */
export function truncateText(text, maxLength) {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Returns the first two uppercase initials of a name (handles multi-word names).
 * Returns '' for blank/null/undefined input.
 */
export function getInitials(name) {
  if (!name || typeof name !== 'string' || !name.trim()) return '';
  return name
    .trim()
    .split(/\s+/)
    .map(n => n[0] || '')
    .join('')
    .substring(0, 2)
    .toUpperCase();
}
