import { Translations } from "../translations";

export const formHtml = (translations: Translations) => `<form id="form">
  <input id="input" name="website" placeholder="${translations["input.placeholder"]}"/>
  <button>${translations["button.analyze"]}</button>
</form>`;
