import {
  attachShadowRoot,
  loadStyles,
  fetchHtml,
  renderTemplate,
} from "../../main.js";

class AccordionComponent extends HTMLElement {
  constructor() {
    super();
    this.shadow = attachShadowRoot(this);
    this.init();
  }

  async init() {
    await loadStyles(this.shadow, "/src/components/accordion/accordion.css");
    const html = await fetchHtml("/src/components/accordion/accordion.html");
    renderTemplate(this.shadow, html);
    this.initAccordions();
  }

  initAccordions() {
    const accordionRoot = this.shadow.querySelector("#accordion-group");
    const accordions = accordionRoot.querySelectorAll(".accordions h2");
    accordions.forEach((accordionEl) => new Accordion(accordionEl));
  }
}

customElements.define("accordion-component", AccordionComponent);

class Accordion {
  constructor(domNode) {
    this.rootEl = domNode;
    this.buttonEl = this.rootEl.querySelector("button[aria-expanded]");
    const controlsId = this.buttonEl.getAttribute("aria-controls");
    this.contentEl = this.rootEl.getRootNode().querySelector(`#${controlsId}`);

    this.open = false;
    this.buttonEl.getAttribute("aria-expanded") === "false";
    this.contentEl.setAttribute("hidden", "");

    this.buttonEl.addEventListener("click", () => this.toggle(!this.open));
  }

  toggle(shouldOpen) {
    if (this.open === shouldOpen) return;

    this.open = shouldOpen;
    this.buttonEl.setAttribute("aria-expanded", `${shouldOpen}`);

    if (shouldOpen) {
      this.contentEl.removeAttribute("hidden");
    } else {
      this.contentEl.setAttribute("hidden", "");
    }
  }
}
