export const toNumber = (value: unknown): number | undefined => {
  if (typeof value !== "string" || value.trim() === "") return undefined;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? undefined : parsed;
};

export const toNonEmptyString = (value: unknown): string | undefined => {
  return typeof value === "string" && value.trim() !== ""
    ? value.trim()
    : undefined;
};
