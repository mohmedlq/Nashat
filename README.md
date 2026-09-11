# 🎓 Nashat (نَشَاط)

**Nashat** is an AI-powered platform that helps teachers create and format school content — automatically.

Originally built as a freelance project for a school, it's now used by real teachers on a daily basis.

🔗 **Live app:** https://nashat-seven.vercel.app

---

## 💡 The Problem It Solves

Every week, teachers manually write activity reports and school broadcast scripts — then format them, add photos, and prepare them for printing. It's repetitive work that has nothing to do with actual teaching.

**Nashat automates it.** A teacher describes what they need in a sentence, and the platform generates a ready-to-edit, print-ready document in seconds.

```
"Create a school broadcast about school discipline for high school students"
        ↓
        AI generates structured content
        ↓
        Teacher reviews, edits, prints
```

---

## ✨ What It Generates

| Content Type | Status |
|---|---|
| 📻 School Broadcasts | ✅ Available |
| 📋 Activity Reports | ✅ Available |
| 🏅 Certificates of Appreciation | 🔜 Coming soon |

### 📻 Broadcasts
Full scripts with intro, Quran recitation, Hadith, morning word, "did you know" facts, and closing — tailored to the target grade level.

### 📋 Reports
Structured activity reports covering school name, region, title, implementer, location, target audience, beneficiaries, date, objectives, and evidence photos — all editable, not just a wall of text.

### 🏅 Certificates *(next up)*
Auto-generated certificates of appreciation and recognition, styled to match the same themes as reports.

---

## 📝 The Editor

Every generated document opens in an editor before printing. Teachers can:

- ✏️ Edit any field (school info, dates, objectives, etc.)
- 🖼️ Add or remove evidence photos — layout adjusts automatically to however many are added
- 🎨 Switch between design themes
- 🖨️ Print directly (A4-ready) or export as PDF

---

## 🎨 Themes

| Theme | Style |
|---|---|
| 🌿 Emerald Teal | Default |
| 👑 Royal Navy | Navy & gold |
| 🍷 Burgundy Luxury | Burgundy tones |

Themes are defined as reusable objects, so new ones can be added without touching the report layout itself.

---

## 👥 Who Uses It

| User | Use Case |
|---|---|
| 👩‍🏫 Teachers | Generate reports and broadcasts instead of writing them by hand |
| 🏫 Activity Coordinators | Standardized, submission-ready reports every time |
| 📻 Broadcast Committees | Full scripts ready in seconds |

---

## 🏗️ How It's Built

The frontend never talks to the AI model directly — it goes through an independent backend API:

```
React (TypeScript) → ASP.NET Core API → AI Model → Structured JSON → back to React
```

This keeps the AI provider swappable and the UI decoupled from how content actually gets generated. The AI is constrained to a fixed schema (not free text), so the output maps directly onto the app's data types — no parsing loose text on the frontend.

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | ⚛️ React, 📘 TypeScript, 🎨 Tailwind CSS, ⚡ Vite |
| Backend / AI | 🟣 ASP.NET Core, 🤖 Generative AI, 📋 JSON Schema |
| Export | 🖼️ html2canvas, 📄 jsPDF |
| Storage | 💾 LocalStorage *(migrating to cloud DB — see roadmap)* |

---

## 📌 Roadmap

- 🏅 Certificates of appreciation & recognition
- 🔐 User accounts & login
- ☁️ Cloud database (replacing LocalStorage)
- 📚 Library of past reports & broadcasts, with search
- 👥 Multi-user support per school
- 🌐 Multi-language support

---

## 👨‍💻 Developer

**Mohmed** — Software Developer

## 📄 License

© Mohmed. All Rights Reserved.
 
This project is proprietary. No part of this codebase may be copied, forked, redistributed, or used to build derivative products without prior written permission from the author.
