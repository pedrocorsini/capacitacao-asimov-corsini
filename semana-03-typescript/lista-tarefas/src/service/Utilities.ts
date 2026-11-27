export interface FormatDateTime {
  date: string;
  time: string;
}

export function formatDate(unformattedDateTime: Date): FormatDateTime {
  const date = unformattedDateTime.toLocaleDateString();
  const time = unformattedDateTime.toLocaleTimeString();
  return { date, time };
}

const MAX_LENGTH = 100;

export function validateTitle(title: string | null | undefined): boolean {
  if (typeof title !== "string") return false;
  const length = title.trim().length;
  return length > 0 && length <= MAX_LENGTH;
}
