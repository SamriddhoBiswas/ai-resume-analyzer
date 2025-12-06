  <h2 align="center">RESUMATE<br>AI Resume Analyzer</h2>

<div align="center">
  <br />
    <a href="https://www.youtube.com/watch?v=iYOz165wGkQ" target="_blank">
      <img src="public/readme/hero.webp" alt="Project Banner">
    </a>
  <br />

  <div>
    <img alt="Static Badge" src="https://img.shields.io/badge/React-4c84f3?style=for-the-badge&logo=react&logoColor=white">
        <img src="https://img.shields.io/badge/-Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
        <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="TypeScript" />
    <img alt="Static Badge" src="https://img.shields.io/badge/Puter.js-181758?style=for-the-badge&logoColor=white">
  </div>



</div>



## <a name="introduction">✨ Introduction</a>

Build an AI-powered Resume Analyzer with React, React Router, and Puter.js! Implement seamless auth, upload and store resumes, and match candidates to jobs using smart AI evaluations. Get custom feedback and ATS scores tailored to each listing—all wrapped in a clean, reusable UI.

If you're getting started and need assistance or face any bugs, join our active Discord community with over **50k+** members. It's a place where people help each other out.

## <a name="tech-stack">⚙️ Tech Stack</a>

- **Frontend:** ⚛️ React, React Router v7, Tailwind CSS, TypeScript
- **Cloud Runtime / Serverless Backend:** 🗄 ☁️ Puter.com (Internet OS + serverless storage/auth/database)
- **AI & Automation::** 🤖 Puter.js AI APIs (GPT, Claude, OCR, DALL·E) for resume parsing, analysis, and feedback
- **State Management::** 🔁 Zustand 
- **Deployment:** 🌐 Puter Cloud Environment

## <a name="features">🔋 Features</a>

👉 **Easy & convenient auth**: Handle authentication entirely in the browser using Puter.js—no backend or setup required.

👉 **Resume upload & storage**: Let users upload and store all their resumes in one place, safely and reliably.

👉 **AI resume matching**: Provide a job listing and get an ATS score with custom feedback tailored to each resume.

👉 **Reusable, modern UI**: Built with clean, consistent components for a great-looking and maintainable interface.

👉 **Code Reusability**: Leverage reusable components and a modular codebase for efficient development.

👉 **Cross-Device Compatibility**: Fully responsive design that works seamlessly across all devices.

👉 **Modern UI/UX**: Clean, responsive design built with Tailwind CSS and shadcn/ui for a sleek user experience.

And many more, including code architecture and reusability.


---

## 📂 Project Structure
```
ai-resume-analyzer/
│
├── .react-router/               # React Router build artifacts
├── app/                         # Main application source
│   ├── components/              # Reusable UI components
│   ├── lib/                     # Utility functions & helpers
│   └── routes/                  # Route definitions & pages
│       ├── app.css              # Global styles
│       ├── root.tsx             # Root layout & providers
│       └── routes.ts            # Route configuration
│
├── constants/                   # Shared constants used across app
├── node_modules/                # Dependencies (auto-generated)
├── public/                      # Static assets (icons, logos, etc.)
├── types/                       # TypeScript definitions & API typings
│   ├── index.d.ts               # Global type declarations
│   └── puter.d.ts               # Puter.js SDK type definitions
│
├── .dockerignore                # Docker ignore rules
├── .gitignore                   # Git ignore rules
├── Dockerfile                   # Container build configuration
├── package.json                 # App metadata & dependencies
├── package-lock.json            # Dependency lockfile
├── react-router.config.ts       # Router configuration
├── tsconfig.json                # TypeScript compiler settings
└── vite.config.ts               # Vite build configuration

```


---

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Cloning the Repository**

```bash
git clone https://github.com/adrianhajdin/ai-resume-analyzer.git
cd ai-resume-analyzer
```

**Installation**
```bash
npm install
```
**Running the Project**
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.
---

## 🤝 Contributing

Contributions are welcome! Fork this repo and submit a pull request.

---

<h3 align="center">2025 ©️ Samriddho Biswas</h3>