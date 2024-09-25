import { Translations } from "../translations";

export const formHtml = (translations: Translations) => html`<form id="form">
  <input
    id="input"
    name="website"
    placeholder="${translations["input.placeholder"]}"
    autocorrect="off"
    autocapitalize="none"
  />
  <button>${translations["button.analyze"]}</button>
</form>`;
