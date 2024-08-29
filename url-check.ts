const VALID_URL_PATTERN =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;

const VALID_URL_REGEX = new RegExp(VALID_URL_PATTERN);

export function isValidUrl(url: string) {
  return Boolean(url.match(VALID_URL_REGEX));
}
