/**
 * Service worker — ทำให้เปิดแอปได้แม้ไม่มีเน็ต (สำคัญมากสำหรับยิมชั้นใต้ดิน)
 *
 * กลยุทธ์
 *  - ไฟล์แอป (same-origin): network-first แล้วเก็บลง cache
 *    (ถ้าใช้ cache-first ผู้ใช้จะเห็นเวอร์ชันเก่าไปอีก 1 รอบหลัง deploy)
 *  - ฟอนต์จาก Google: cache-first เพราะแทบไม่เปลี่ยนและช่วยให้เปิดไว
 *  - ไม่มีเน็ต -> ตกกลับไปใช้ cache ทุกกรณี
 *
 * path ทุกอันเป็น relative จึงทำงานได้ทั้งที่ root และใต้ /repo-name/
 */
const CACHE = 'workout-v15';

const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/style.css',
  './icons/icon.svg',
  './js/app.js',
  './js/chart.js',
  './js/dom.js',
  './js/format.js',
  './js/program.js',
  './js/stats.js',
  './js/storage.js',
  './js/theme.js',
  './js/timer.js',
  './js/types.js',
  './js/views/home.js',
  './js/views/workout.js',
  './js/views/history.js',
  './js/views/exercise.js',
  './js/views/settings.js',
  './js/views/placeholder.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameOrigin && !isFont) return;

  const keep = (res) => {
    if (res && (res.ok || res.type === 'opaque')) {
      const copy = res.clone();
      caches.open(CACHE).then((cache) => cache.put(request, copy));
    }
    return res;
  };

  // ฟอนต์: เอาจาก cache ก่อน
  if (isFont) {
    event.respondWith(caches.match(request).then((hit) => hit || fetch(request).then(keep)));
    return;
  }

  // ไฟล์แอป: เอาของใหม่ก่อน ถ้าเน็ตไม่มาค่อยใช้ของใน cache
  event.respondWith(
    fetch(request)
      .then(keep)
      .catch(() =>
        caches
          .match(request)
          .then((hit) => hit || (request.mode === 'navigate' ? caches.match('./index.html') : undefined)),
      ),
  );
});
