# Workout — ตารางออกกำลังกาย Push / Pull / Legs

เว็บแอป static สำหรับจดบันทึกการเล่นเวทในยิม ออกแบบให้ใช้มือเดียวบนมือถือ
ข้อมูลทั้งหมดเก็บใน `localStorage` ของเครื่อง ไม่มี backend ไม่มี login

**Tech stack:** HTML + CSS + JavaScript (ES modules) ล้วน — ไม่มี build step ไม่มี npm install

---

## รันบนเครื่อง

ต้องเปิดผ่าน HTTP server (เปิดไฟล์ด้วย `file://` ตรง ๆ ไม่ได้ เพราะ ES modules ติด CORS)

```bash
npx serve -l 3000 .
```

แล้วเปิด http://localhost:3000

### ทดสอบแบบ subpath (แนะนำก่อน push)

GitHub Pages ของรีโปทั่วไปจะอยู่ใต้ `/<repo-name>/` การทดสอบผ่าน subpath ช่วยจับ path ที่เขียนแบบ absolute ตั้งแต่ก่อน deploy

```bash
mkdir -p /tmp/pages-test/workout && cp -R . /tmp/pages-test/workout && npx serve -l 3000 /tmp/pages-test
```

แล้วเปิด http://localhost:3000/workout/ ถ้าหน้าตาปกติแปลว่า path ถูกต้องทั้งหมด

---

## เปิด GitHub Pages

1. push โค้ดขึ้น branch `main`
2. ไปที่รีโปบน GitHub → **Settings** → **Pages**
3. **Source** เลือก **Deploy from a branch**
4. **Branch** เลือก `main` และโฟลเดอร์ `/ (root)` → **Save**
5. รอสักครู่ เว็บจะขึ้นที่ `https://<username>.github.io/<repo-name>/`

ไม่ต้องมี GitHub Actions เพราะไม่มีขั้นตอน build — push แล้วเห็นผลเลย

### เรื่อง base path (สำคัญ)

โปรเจกต์นี้ใช้ **relative path ทั้งหมด** (`./css/style.css`, `./js/app.js`) จึงทำงานได้ทั้ง

- `https://username.github.io/repo-name/` (รีโปทั่วไป)
- `https://username.github.io/` (รีโปชื่อ `username.github.io`)
- โฟลเดอร์ย่อยอะไรก็ได้

โดยไม่ต้องแก้ค่า config ใด ๆ

> **อย่าเปลี่ยนไปใช้ absolute path** เช่น `/css/style.css` เพราะจะพังทันทีเมื่อ deploy ใต้ subpath

### เรื่อง routing

แอปใช้ **hash routing** (`#/workout/day1`) เพราะ GitHub Pages ไม่มี server rewrite
ถ้าใช้ History API แล้วผู้ใช้กด refresh ที่ `/history` จะได้ 404 ทันที

### ไฟล์ `.nojekyll`

มีไฟล์ `.nojekyll` เปล่า ๆ ที่ root เพื่อบอก GitHub Pages ว่าไม่ต้องประมวลผลด้วย Jekyll
(ไม่งั้นโฟลเดอร์/ไฟล์ที่ขึ้นต้นด้วย `_` จะถูกข้ามไป) — **ห้ามลบ**

---

## แก้ไขข้อมูลตาราง

แก้ไฟล์เดียวคือ [`js/program.js`](js/program.js) ส่วนอื่นของแอปอ่านจากที่นี่ทั้งหมด

```js
{
  id: 'chest-press',              // ห้ามซ้ำ และห้ามเปลี่ยนทีหลัง (ประวัติผูกกับ id นี้)
  name: 'Chest Press Machine',    // ชื่อบนป้ายเครื่องในยิม
  nameTh: 'ดันอกด้วยเครื่อง',      // ชื่อไทย/หมายเหตุ
  sets: 3,
  repsMin: 10,
  repsMax: 12,                    // ถ้าเป็นจำนวนคงที่ ใส่ค่าเท่ากับ repsMin
  restSec: 90,                    // ถ้าโปรแกรมบอกเป็นช่วง ให้ใส่ค่ากลาง
  isTimed: false,                 // true = กรอกเป็นวินาที เช่น Plank
  link: 'https://…',              // ลิงก์วิดีโอสอนท่า
  alt: 'ใช้ Cable ข้างเดียวแทนได้', // เครื่องทดแทนถ้ายิมไม่มี
}
```

> ⚠️ **`id` ของท่าคือกุญแจที่ใช้ผูกประวัติ** ถ้าแก้ `id` ของท่าที่เคยบันทึกไว้
> ประวัติเก่าของท่านั้นจะกลายเป็นข้อมูลกำพร้า — เปลี่ยนชื่อ (`name`) ได้ตามใจ แต่อย่าเปลี่ยน `id`

เพิ่ม/ลบท่าหรือเพิ่มวันที่ 4 ได้โดยแก้ array `PROGRAM` ตรง ๆ (`accent` รับค่า `push` / `pull` / `legs`
ถ้าเพิ่มโทนสีใหม่ ต้องเพิ่ม `[data-accent='…']` ใน `css/style.css` ด้วย)

---

## โครงสร้างโปรเจกต์

```
index.html          โครงหน้า + top bar + tab bar
.nojekyll           ปิด Jekyll บน GitHub Pages
css/style.css       ธีมทั้งหมด (dark เป็นค่าเริ่มต้น, light = โทนคอนกรีต)
js/
  program.js        ★ ข้อมูลตาราง — แก้ไฟล์นี้เพื่อเปลี่ยนโปรแกรม
  types.js          JSDoc typedefs (ให้ editor ช่วย autocomplete โดยไม่ต้อง compile)
  storage.js        wrapper ของ localStorage + import/export
  format.js         แปลงวันที่/เวลาเป็นข้อความไทย
  dom.js            helper สร้าง DOM (html`` template + escape อัตโนมัติ)
  app.js            hash router + bootstrap + ธีม
  views/
    home.js         หน้าเลือกวัน
    placeholder.js  หน้าที่ยังไม่ได้ทำในเฟสนี้
```

## ข้อมูลที่เก็บใน localStorage

key เดียวคือ `workout-tracker:v1` เก็บเป็น JSON ก้อนเดียว เพื่อให้ export/import ได้ง่าย

```jsonc
{
  "version": 1,
  "sessions": [
    {
      "id": "…",
      "dayId": "day1",
      "startedAt": 1754100000000,
      "finishedAt": 1754103600000,
      "entries": { "chest-press": [{ "weight": 40, "reps": 12, "done": true }] }
    }
  ],
  "settings": { "theme": "auto", "sound": true, "vibrate": true }
}
```

---

## สถานะการพัฒนา

- [x] **Phase 1** — scaffold, ข้อมูลตาราง, หน้า Home (แสดงเล่นล่าสุด + ไฮไลต์วันที่ควรเล่นต่อไป)
- [ ] **Phase 2** — หน้า Workout: กรอกน้ำหนัก/ครั้ง, auto-fill จากครั้งก่อน, บันทึกลง localStorage
- [ ] **Phase 3** — Rest timer (sticky bar, +15/−15/ข้าม, beep + สั่น, คำนวณจาก timestamp)
- [ ] **Phase 4** — History, กราฟความก้าวหน้า, PR, แบดจ์ "พร้อมเพิ่มน้ำหนัก"
- [ ] **Phase 5** — Import / Export / Reset
