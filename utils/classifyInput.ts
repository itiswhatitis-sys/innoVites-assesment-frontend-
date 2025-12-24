export type InputType = 'DB' | 'JSON' | 'TEXT';

export function classifyInput(raw: string): { type: InputType; payload: any } {
  const trimmed = raw.trim();

  // 1️⃣ Try JSON
  try {
    const parsed = JSON.parse(trimmed);
    if (typeof parsed === 'object' && parsed !== null) {
      return { type: 'JSON', payload: parsed };
    }
  } catch {}

  // 2️⃣ Detect DB ID (starts with "CABLE" or similar)
  if (/^CABLE_\d+$/i.test(trimmed)) {
    return { type: 'DB', payload: trimmed };
  }

  // 3️⃣ Fallback to free text
  return { type: 'TEXT', payload: trimmed };
}
