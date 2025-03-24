export function attachShadowRoot(component) {
  return component.attachShadow({ mode: "open" });
}

export async function loadStyles(shadowRoot, href) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  shadowRoot.appendChild(link);
}

export async function fetchHtml(path) {
  const res = await fetch(path);
  return res.text();
}

export function renderTemplate(shadowRoot, html) {
  const template = document.createElement("template");
  template.innerHTML = html;
  shadowRoot.appendChild(template.content.cloneNode(true));
}
