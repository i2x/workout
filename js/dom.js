/** DOM helper เล็ก ๆ — ไม่มี framework, ไม่มี dependency */

const RAW = Symbol('raw');

/** ทำเครื่องหมายว่าสตริงนี้เป็น HTML ดิบ ไม่ต้อง escape */
export function raw(str) {
  return { [RAW]: String(str) };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stringify(value) {
  if (value == null || value === false) return '';
  if (Array.isArray(value)) return value.map(stringify).join('');
  if (typeof value === 'object' && RAW in value) return value[RAW];
  return escapeHtml(value);
}

/**
 * html`<div>${x}</div>` — ค่าที่แทรกจะถูก escape ให้อัตโนมัติ
 * ใช้ raw() ถ้าต้องการแทรก HTML ที่สร้างเองแล้ว
 * @returns {{[RAW]: string}}
 */
export function html(strings, ...values) {
  let out = '';
  strings.forEach((s, i) => {
    out += s + (i < values.length ? stringify(values[i]) : '');
  });
  return raw(out);
}

/** แปลงผลลัพธ์ของ html`` เป็น DocumentFragment */
export function frag(node) {
  const tpl = document.createElement('template');
  tpl.innerHTML = stringify(node).trim();
  return tpl.content;
}

/** แปลงผลลัพธ์ของ html`` เป็น Element ตัวแรก */
export function toElement(node) {
  return frag(node).firstElementChild;
}

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/** event delegation แบบสั้น ๆ */
export function on(root, type, selector, handler) {
  root.addEventListener(type, (ev) => {
    const target = ev.target.closest(selector);
    if (target && root.contains(target)) handler(ev, target);
  });
}
