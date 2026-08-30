const HEAT: Record<string, number> = { hot: 0, medium: 1, warm: 2, cold: 3 };

export function displayIst(value: string | undefined): string {
  if (!value) return "";
  // ISO / offset only. "2026-08-30 10:18 IST" and bare local stamps stay as-is.
  if (!/T|[zZ]|[+-]\d{2}:\d{2}/.test(value)) return value;
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return value;
  return new Date(parsed).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function snapshotWhen(value: string | undefined): string {
  const shown = displayIst(value);
  if (!shown) return "";
  return /IST/i.test(shown) ? shown : `${shown} IST`;
}

export function chatTypeLabel(t: string | undefined): string {
  if (t === "oneOnOne") return "1:1";
  if (t === "group") return "group";
  if (t === "meeting") return "meeting";
  return t ?? "";
}

export function hottestFirst<T extends { heat?: string; rank?: number }>(rows: T[]): T[] {
  return [...rows].sort((a, b) => {
    const ha = HEAT[a.heat ?? ""] ?? 99;
    const hb = HEAT[b.heat ?? ""] ?? 99;
    if (ha !== hb) return ha - hb;
    return (a.rank ?? 99) - (b.rank ?? 99);
  });
}
