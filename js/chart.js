/**
 * กราฟเส้นเล็ก ๆ วาดด้วย SVG เอง — ไม่ต้องโหลดไลบรารีจาก CDN
 * (เปิดในยิมเน็ตช้าก็ยังขึ้นครบ และใช้ offline ได้)
 */
import { html, raw } from './dom.js';
import { shortDate } from './format.js';

const W = 320;
const H = 132;
const PAD = { top: 16, right: 10, bottom: 24, left: 10 };

let uid = 0;

/**
 * @param {{x:number, y:number}[]} points  x = timestamp, y = ค่า
 * @param {{unit?:string, formatter?:(n:number)=>string}} opts
 */
export function lineChart(points, opts = {}) {
  const fmt = opts.formatter || ((n) => String(Math.round(n)));
  const unit = opts.unit || '';

  if (!points.length) {
    return html`<p class="chart__empty">ยังไม่มีข้อมูลพอจะวาดกราฟ</p>`;
  }

  const id = `g${++uid}`;
  const ys = points.map((p) => p.y);
  const yMax = Math.max(...ys);
  const yMin = Math.min(...ys);
  // เผื่อขอบบน/ล่างไว้ 12% เพื่อไม่ให้เส้นแตะขอบกราฟ
  const span = yMax - yMin || Math.max(1, yMax * 0.2);
  const top = yMax + span * 0.12;
  const bottom = Math.max(0, yMin - span * 0.12);

  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const px = (i) =>
    PAD.left + (points.length === 1 ? innerW / 2 : (i / (points.length - 1)) * innerW);
  const py = (v) => PAD.top + innerH - ((v - bottom) / (top - bottom)) * innerH;

  const coords = points.map((p, i) => [px(i), py(p.y)]);
  const line = coords.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  const area = `${line} L${coords[coords.length - 1][0].toFixed(1)} ${PAD.top + innerH} L${coords[0][0].toFixed(1)} ${PAD.top + innerH} Z`;

  const dots = coords
    .map(([x, y], i) =>
      `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${i === coords.length - 1 ? 4 : 2.6}"
        class="${i === coords.length - 1 ? 'chart__dot chart__dot--last' : 'chart__dot'}" />`,
    )
    .join('');

  const first = points[0];
  const last = points[points.length - 1];
  const delta = points.length > 1 ? last.y - first.y : 0;
  const trend = delta > 0 ? 'up' : delta < 0 ? 'down' : 'flat';

  return html`
    <div class="chart">
      <div class="chart__head">
        <span class="chart__now">${fmt(last.y)}<small>${unit}</small></span>
        ${points.length > 1
          ? html`<span class="chart__delta" data-trend="${trend}">
              ${delta > 0 ? '▲' : delta < 0 ? '▼' : '—'} ${fmt(Math.abs(delta))}${unit}
            </span>`
          : ''}
        <span class="chart__peak">สูงสุด ${fmt(yMax)}${unit}</span>
      </div>
      ${raw(`
        <svg class="chart__svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"
             role="img" aria-label="กราฟความก้าวหน้า ${points.length} ครั้ง">
          <defs>
            <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" class="chart__stop-a" />
              <stop offset="100%" class="chart__stop-b" />
            </linearGradient>
          </defs>
          <line class="chart__grid" x1="${PAD.left}" y1="${PAD.top + innerH}" x2="${W - PAD.right}" y2="${PAD.top + innerH}" />
          <path class="chart__area" d="${area}" fill="url(#${id})" />
          <path class="chart__line" d="${line}" />
          ${dots}
        </svg>
      `)}
      <div class="chart__axis">
        <span>${shortDate(first.x)}</span>
        <span>${points.length} ครั้ง</span>
        <span>${shortDate(last.x)}</span>
      </div>
    </div>
  `;
}
