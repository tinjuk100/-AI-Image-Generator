# อาจารย์สายดำ: AI Image Generator

ยินดีต้อนรับสู่ "อาจารย์สายดำ: จิตรกร AI" เครื่องมือสร้างรูปภาพ (Text-to-Image) สุดล้ำ ที่จะแปลงคำสั่งของท่านให้กลายเป็นผลงานศิลปะดิจิทัล ด้วยพลังของ Google Gemini 2.5 Flash Image!

## คุณสมบัติเด่น

*   **UI ที่เรียบง่ายและทรงพลัง:** เพียงแค่พิมพ์คำสั่งภาพที่ต้องการ แล้วกดปุ่ม "Generate Image"
*   **การสร้างภาพด้วย AI:** ใช้ Gemini 2.5 Flash Image เพื่อสร้างภาพอย่างรวดเร็วและมีประสิทธิภาพ
*   **รองรับ API Key จาก AI Studio และ Environment Variables:** มีกลไกการเลือก API Key ที่เหมาะสมสำหรับ AI Studio และรองรับการตั้งค่าผ่าน `process.env.API_KEY` สำหรับสภาพแวดล้อมอื่น ๆ
*   **Dark Mode:** ออกแบบมาเพื่อความสบายตาและสไตล์ที่เข้ากับ "อาจารย์สายดำ"
*   **การจัดการข้อผิดพลาด:** แจ้งเตือนเมื่อเกิดปัญหาในการสร้างภาพ

## วิธีการใช้งาน (สำหรับ Replit, Vercel หรือ Local Development)

โปรเจกต์นี้ถูกออกแบบมาเพื่อให้ทำงานบนแพลตฟอร์มอย่าง Replit, Vercel หรือแม้แต่การรันบนเครื่องคอมพิวเตอร์ส่วนตัวได้ ท่านจะพบว่า `process.env.API_KEY` และ `window.aistudio` จะถูกจัดการให้โดยอัตโนมัติใน AI Studio environment

### 1. การเตรียม API Key (สำคัญมาก!)

โมเดล `gemini-2.5-flash-image` มักจะมี Free Tier ที่พร้อมใช้งาน อย่างไรก็ตาม การทำงานยังคงต้องใช้ API Key ที่ถูกต้อง

*   **สำหรับ AI Studio Environment (Replit, Vercel ที่เชื่อมต่อ AI Studio):**
    *   เมื่อท่านรันแอปพลิเคชันเป็นครั้งแรก (หรือเมื่อ API Key มีปัญหา) แอปจะแสดงหน้าจอให้ท่าน **"ปลดปล่อยพลังงาน (เลือก API Key ใน AI Studio)"**
    *   คลิกที่ปุ่มนั้นเพื่อเปิดหน้าต่างให้ท่านเลือกหรือสร้าง API Key ที่ผูกกับโปรเจกต์ Google Cloud ของท่าน
    *   **สิ่งสำคัญ:** ตรวจสอบให้แน่ใจว่าโปรเจกต์ของท่านได้เปิดใช้งาน **Gemini API** หากพบปัญหาเรื่องการใช้งานหรือไม่สามารถเรียกใช้โมเดลได้ อาจจำเป็นต้องตรวจสอบการตั้งค่าการเรียกเก็บเงิน (Billing) สามารถศึกษาเพิ่มเติมได้ที่: [ai.google.dev/gemini-api/docs/billing](ai.google.dev/gemini-api/docs/billing)
*   **สำหรับ Local Development หรือ Non-AI Studio Environments:**
    *   ในสภาพแวดล้อมเหล่านี้ `window.aistudio` จะไม่พร้อมใช้งาน แอปพลิเคชันจะพยายามใช้ API Key ที่ตั้งค่าไว้ใน `process.env.API_KEY` ทันที
    *   ท่านสามารถตั้งค่า `API_KEY` ได้โดยการสร้างไฟล์ `.env` ใน root directory ของโปรเจกต์ และเพิ่มบรรทัด `VITE_API_KEY=YOUR_GEMINI_API_KEY_HERE` (หากใช้ Vite) หรือตั้งค่าเป็น Environment Variable ตามระบบปฏิบัติการของท่าน

### 2. รันแอปพลิเคชัน

#### บน Replit (แนะนำ)

1.  **Fork this Repl:** ไปที่หน้า Repl ของโปรเจกต์นี้ แล้วกดปุ่ม "Fork" เพื่อสร้างสำเนาโปรเจกต์ในบัญชีของท่าน
2.  **Run:** กดปุ่ม "Run" ที่ด้านบนของ Replit
3.  **Select API Key / Proceed:** หากเป็นครั้งแรกที่ท่านรันบน AI Studio ท่านจะเห็นหน้าจอให้เลือก API Key ทำตามขั้นตอนในข้อ 1.1 หากรันในสภาพแวดล้อมอื่น ๆ และตั้งค่า API Key ไว้แล้ว แอปจะพร้อมใช้งานทันที
4.  **Ready to use:** เมื่อทุกอย่างพร้อม ท่านก็พร้อมที่จะเริ่มสร้างภาพได้ทันที!

#### บน Vercel

1.  **Import Project:** เข้าสู่ระบบ Vercel Dashboard ของท่าน แล้วเลือก "Add New... Project"
2.  **Connect Git Repository:** เชื่อมต่อกับ Git Repository ของโปรเจกต์นี้ (เช่น GitHub, GitLab, Bitbucket)
3.  **Environment Variables:** Vercel จะตรวจจับ `process.env.API_KEY` โดยอัตโนมัติจาก AI Studio environment หรือท่านสามารถตั้งค่า `API_KEY` ด้วยตนเองในส่วน Environment Variables ของ Vercel project settings สำหรับการใช้งานนอก AI Studio
4.  **Deploy:** กดปุ่ม "Deploy"
5.  **Select API Key / Proceed:** หากรันผ่าน AI Studio environment ท่านจะเห็นหน้าจอให้เลือก API Key ทำตามขั้นตอนในข้อ 1.1 หาก Deploy ในสภาพแวดล้อมอื่น ๆ และตั้งค่า API Key ไว้แล้ว แอปจะพร้อมใช้งานทันที
6.  **Ready to use:** เมื่อ Deploy และ API Key พร้อมแล้ว ท่านก็พร้อมใช้งาน!

#### Local Development (โดยใช้ Vite)

1.  **Clone the repository:** `git clone [URL_ของ_repository_นี้]`
2.  **Navigate to project directory:** `cd ajarn-saidum-image-generator`
3.  **Install dependencies:** `npm install` (หรือ `yarn install`)
4.  **Create `.env` file:** สร้างไฟล์ชื่อ `.env` ใน root directory ของโปรเจกต์
5.  **Add your API Key:** เปิดไฟล์ `.env` และเพิ่มบรรทัดนี้ (แทนที่ `YOUR_GEMINI_API_KEY_HERE` ด้วย API Key จริงของท่าน):
    ```
    VITE_API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```
6.  **Run in development mode:** `npm run dev` (หรือ `yarn dev`)
7.  **Open in browser:** เปิดเบราว์เซอร์ไปที่ URL ที่แสดงใน Terminal (โดยปกติคือ `http://localhost:5173`) แอปพลิเคชันจะโหลดโดยตรงโดยไม่ต้องผ่านหน้าจอเลือก API Key

## โครงสร้างโปรเจกต์

```
.
├── public/
├── src/
│   ├── components/
│   │   ├── ApiKeySelector.tsx
│   │   └── LoadingSpinner.tsx
│   ├── services/
│   │   └── geminiService.ts
│   ├── App.tsx
│   ├── constants.ts
│   ├── index.tsx
│   └── types.ts
├── index.html
├── metadata.json
├── package.json
└── README.md
```

## เทคโนโลยีที่ใช้

*   **Frontend:** React 18+ (TypeScript)
*   **Styling:** Tailwind CSS
*   **AI Engine:** Google Gemini 2.5 Flash Image (`@google/genai`)
*   **Deployment:** Vercel / Replit / Local (Vite)

---

## คำเตือนจากอาจารย์สายดำ

*   **คำสั่งต้องชัดเจน!** ยิ่งละเอียด ภาพยิ่งตรงใจ
*   **พลังงานไม่พอ ภาพไม่มา!** ตรวจสอบ API Key ของท่านให้ดีว่าถูกต้องและเข้ากันกับโมเดลที่ใช้
*   **จงสร้างสรรค์!** แต่อย่าได้สร้างสิ่งไร้สาระ!

**เริ่มสร้างผลงานชิ้นเอกของท่านได้เลย!**