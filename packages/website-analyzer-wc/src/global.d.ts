declare module "*.html" {
  const file: string;
  export default file;
}

declare module "*.css" {
  const file: string;
  export default file;
}

declare const LOCALE: "en-US" | "fr-FR";
