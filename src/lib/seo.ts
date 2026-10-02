function setMeta(key: string, content: string, attr: 'name' | 'property') {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function applySeo(title: string, description: string) {
  document.title = title;
  setMeta('description', description, 'name');
  setMeta('og:title', title, 'property');
  setMeta('og:description', description, 'property');
}
