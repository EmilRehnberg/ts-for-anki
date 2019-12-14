export function nDots(cnt: number): string {
  return Array(cnt + 1).join("・");
}

export function readInitialDigits(txt: string): number {
  return parseInt(txt);
}

export function rmDigits(txt: string): string {
  return txt.replace(/[\d]/g, "");
}

export function rmInitialDigits(txt: string): string {
  return txt.replace(/\d+/, "");
}
