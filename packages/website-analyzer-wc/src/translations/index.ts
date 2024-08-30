export const localizedTranslations = async () =>
  LOCALE === "en-US"
    ? (await import("./en.json")).default
    : (await import("./fr.json")).default;

export type Translations = Awaited<ReturnType<typeof localizedTranslations>>;
