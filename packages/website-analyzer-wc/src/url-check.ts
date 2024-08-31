const VALID_HTTP_URL_PATTERN = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
const VALID_NON_HTTP_URL_PATTERN = /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;

const VALID_HTTP_URL_REGEX = new RegExp(VALID_HTTP_URL_PATTERN);
const VALID_NON_HTTP_URL_REGEX = new RegExp(VALID_NON_HTTP_URL_PATTERN);

export function isValidUrl(url: string) {
  if (!url.startsWith("https://") && !url.startsWith("http://")) {
    if (Boolean(url.match(VALID_NON_HTTP_URL_REGEX))) {
      const httpUrl = `https://${url}`;
      return { isValid: true, httpUrl };
    }
    return { isValidUrl: false, httpUrl: "" };
  }

  return { isValid: Boolean(url.match(VALID_HTTP_URL_REGEX)), httpUrl: url };
}
