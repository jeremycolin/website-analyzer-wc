declare module "*.html" {
  const file: string;
  export default file;
}

declare module "*.css" {
  const file: string;
  export default file;
}

declare const TRANSLATIONS: unknown;

declare const html: typeof String.raw;
