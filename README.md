# interview-pro

AI-powered interview preparation platform with a premium dashboard, resume analysis, job description matching, mock interview workflow, and career-planning insights.

## Dashboard Preview

```text
┌────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ InterviewAI Pro                                                                                     │
│                                                                                                    │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐               │
│ │ Overall Match│ │ Skills Covered│ │ Mock Interviews│ │ Avg. Answer │ │ Study Streak │               │
│ │ Score        │ │              │ │              │ │ Score       │ │              │               │
│ │ 88%          │ │ 24/32        │ │ 12           │ │ 78/100      │ │ 7 Days       │               │
│ │ Strong Match │ │ 75%          │ │ Completed    │ │ Good        │ │ Keep it up!  │               │
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘               │
│                                                                                                    │
│ Your AI Interview Plan                                                                             │
│ Roadmap View   Timeline View                                                                       │
│                                                                                                    │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐                                │
│ │ Foundation   │ │ Advanced     │ │ Practice     │ │ Mastery      │                                │
│ │ • Core        │ │ • System     │ │ • Mock       │ │ • Company    │                                │
│ │   Concepts    │ │   Design     │ │   Interviews │ │   Prep       │                                │
│ │ • Data        │ │ • Deep       │ │ • Behavioral│ │ • Final      │                                │
│ │   Structures  │ │   Learning   │ │   Prep       │ │   Revision   │                                │
│ │ Day 1-3       │ │ Day 4-10     │ │ Day 11-17    │ │ Day 18-21    │                                │
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘                                │
│                                                                                                    │
│ ┌──────────────┐ ┌──────────────────────────────────────────────┐                                  │
│ │ AI Mock      │ │ Recent AI Feedback                            │
│ │ Interview    │ │ Technical  85/100   Explain the difference... │
│ │ Voice UI     │ │ Behavioral 72/100   How do you handle conflict?│
│ │ Start Voice  │ │ System Design 88/100   Design a real-time chat │
│ │ Interview    │ │                                              │
│ └──────────────┘ └──────────────────────────────────────────────┘                                  │
│                                                                                                    │
│ ┌──────────────┐ ┌──────────────────────────┐ ┌──────────────────────────┐                          │
│ │ Resume       │ │ Skill Gap Analysis      │ │ Recent Activity         │                          │
│ │ Analysis     │ │ System Design 60%       │ │ Mock Interview Done     │                          │
│ │ ATS            │ │ Cloud Arch 65%          │ │ Resume Analyzed          │                          │
│ │ 82/100         │ │ MLOps 70%              │ │ New Plan Generated      │                          │
│ └──────────────┘ └──────────────────────────┘ └──────────────────────────┘                          │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

## Features

- AI interview preparation dashboard
- Resume and JD analysis
- Skill gap analysis and roadmap generation
- Mock interview flow with voice input
- Dark premium interface
- Real-time AI-powered feedback loop

## Tech Stack

- Frontend: React + Vite + SCSS
- Backend: Node.js + Express
- Database: MongoDB
- AI: Google Gemini / GenAI
- Auth: JWT + cookies

## Project Structure

```text
interview-pro/
├── Backend/
│   ├── src/
│   ├── server.js
│   └── package.json
├── Frontend/
│   ├── src/
│   ├── index.html
│   └── package.json
├── README.md
├── package.json
└── requirements.txt
```

## Getting Started

### 1. Install dependencies

```bash
npm install
cd Frontend && npm install
cd ../Backend && npm install
```

### 2. Configure environment

Create `.env` files and add your keys.

```bash
# Backend .env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/interview-assistant
GEMINI_API_KEY=your_key_here
JWT_SECRET=your_jwt_secret
```

### 3. Run the app

```bash
# Backend
cd Backend
npm run dev

# Frontend
cd Frontend
npm run dev
```

## Notes

This project is designed for real-life interview preparation workflows using AI-driven analysis, planning, and mock interview practice.

## License

MIT
