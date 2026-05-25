const crisisPatterns = [
  /\bkill myself\b/i,
  /\bsuicide\b/i,
  /\bend my life\b/i,
  /\bhurt myself\b/i,
  /\bself harm\b/i,
  /\bcan't go on\b/i,
  /\bdo not want to live\b/i
];

export function detectsCrisisLanguage(text: string): boolean {
  return crisisPatterns.some((pattern) => pattern.test(text));
}
