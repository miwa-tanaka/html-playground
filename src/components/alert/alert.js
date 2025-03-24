import {
  attachShadowRoot,
  loadStyles,
  fetchHtml,
  renderTemplate,
} from "../../main.js";

class AlertComponent extends HTMLElement {
  constructor() {
    super();
    this.shadow = attachShadowRoot(this);
    this.init();
  }

  async init() {
    await loadStyles(this.shadow, "/src/components/alert/alert.css");
    const html = await fetchHtml("/src/components/alert/alert.html");
    renderTemplate(this.shadow, html);
    this.initAlert();
  }

  initAlert() {
    const button = this.shadow.querySelector(".alert-button");
    const alertBox = this.shadow.querySelector("#alert-content");

    button?.addEventListener("click", () => {
      alertBox?.classList.add("visible");
    });
  }
}

customElements.define("alert-component", AlertComponent);
