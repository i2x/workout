import { html, toElement } from '../dom.js';

/** หน้าเมื่อ hash ไม่ตรงกับ route ไหนเลย */
export function renderNotFound() {
  return toElement(html`
    <section class="view">
      <header class="page-head">
        <h1 class="page-head__title">404</h1>
        <p class="page-head__sub">ไม่พบหน้านี้</p>
      </header>
      <p class="note">ลิงก์อาจพิมพ์ผิด — <a href="#/">กลับหน้าตาราง</a></p>
    </section>
  `);
}
