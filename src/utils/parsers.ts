export const toNumber = (value: unknown): number | undefined => {
  if (typeof value !== "string" || value.trim() === "") return undefined;
  const number = Number(value);
  return Number.isNaN(number) ? undefined : number;
};

export const toText = (value: unknown): string | undefined => {
  return typeof value === "string" && value.trim() !== ""
    ? value.trim()
    : undefined;
};
