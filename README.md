# InterviewAI Pro

A modern AI-powered interview preparation platform that helps users practice for technical, behavioral, and system-design interviews with smart feedback, personalized roadmaps, and progress tracking.

This application combines resume analysis, job description matching, AI-driven skill gap evaluation, and realistic mock interview experiences into one polished SaaS-style workflow.

## Why this platform matters

Candidates often struggle with three common problems while preparing for interviews:

- understanding how well their resume matches the role
- identifying the exact skills they need to improve
- practicing under realistic interview pressure with meaningful feedback

InterviewAI Pro solves these problems by combining AI analysis, interview coaching, and continuous progress tracking in one system.

---

## Dashboard preview

```text
┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ InterviewAI Pro                                                                                          │
│                                                                                                          │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐      │
│ │ Overall Match   │ │ Skill Coverage  │ │ Mock Interviews │ │ Avg. Answer    │ │ Study Streak    │      │
│ │ 88%             │ │ 24 / 32         │ │ 12 Completed   │ │ 78 / 100       │ │ 7 Days         │      │
│ │ Strong Fit      │ │ +6 Strong       │ │ 3 This Week    │ │ Good Flow      │ │ Consistent     │      │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘ └─────────────────┘ └─────────────────┘      │
│                                                                                                          │
│ Your AI Interview Roadmap                                                                              │
│ [Overview] [Timeline] [Progress]                                                                        │
│                                                                                                          │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐                            │
│ │ Foundation      │ │ Deep Learning   │ │ Practice        │ │ Final Prep      │                            │
│ │ • Core CS       │ │ • System Design │ │ • Mock Rounds   │ │ • Company Prep  │                            │
│ │ • Data Struct.  │ │ • Algorithms    │ │ • Behavioral    │ │ • Final Review  │                            │
│ │ • JavaScript    │ │ • Architecture  │ │ • Live Feedback │ │ • Stress Prep   │                            │
│ │ Day 1 - 3       │ │ Day 4 - 10      │ │ Day 11 - 17     │ │ Day 18 - 21     │                            │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘ └─────────────────┘                            │
│                                                                                                          │
│ ┌───────────────────────────────┐ ┌──────────────────────────────────────────────────────────────┐          │
│ │ AI Mock Interview             │ │ Recent AI Feedback                                            │          │
│ │                               │ │ Technical Round: 85/100                                        │          │
│ │ Start Voice Interview         │ │ Behavioral Round: 72/100                                       │          │
│ │ Practice with AI              │ │ System Design: 88/100                                          │          │
│ │                               │ │ "Explain the tradeoff between vertical and horizontal scaling" │          │
│ └───────────────────────────────┘ └──────────────────────────────────────────────────────────────┘          │
│                                                                                                          │
│ ┌──────────────────┐ ┌─────────────────────────────┐ ┌────────────────────────────┐                     │
│ │ Resume Analysis  │ │ Skill Gap Analysis          │ │ Recent Activity            │                     │
│ │ ATS Score: 82    │ │ System Design: 64%          │ │ Mock interview completed  │                     │
│ │ Keywords: 91%    │ │ Cloud: 72%                 │ │ Resume file analyzed      │                     │
│ │ Match Quality: A │ │ JavaScript: 81%           │ │ Roadmap updated            │                     │
│ └──────────────────┘ └─────────────────────────────┘ └────────────────────────────┘                     │
└──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## How the web app works

The product is built as a full-stack web application with a clear separation between the frontend, API layer, and AI services.

### 1. User logs in and uploads a resume
The frontend allows users to sign in, view dashboard metrics, and upload their resume or profile data.

### 2. AI analyzes the CV and target job description
The backend processes the uploaded resume, compares it with a job description, and identifies missing skills or mismatches.

### 3. A personalized roadmap is generated
The system creates a structured interview preparation plan based on the user's skill profile and target role.

### 4. The user enters mock interviews
The user can start a mock interview, answer questions in text or voice mode, and receive AI-generated feedback on communication and technical depth.

### 5. Progress is tracked over time
Interview reports, scores, and skill insights are saved in the database so the dashboard stays updated as the user improves.

---

## Core features

- Resume upload and analysis
- Job description matching
- AI-powered skill gap detection
- Personalized interview preparation roadmap
- Mock interviews with text and voice support
- Real-time evaluation and feedback
- Dashboard analytics and progress tracking
- Secure authentication and session handling
- Dark premium interface for professional user experience

---

## Technology stack

### Frontend
- React
- Vite
- JavaScript / JSX
- SCSS for styling
- React Router for navigation

The frontend handles user experience, dashboards, interview pages, analysis panels, and data presentation.

### Backend
- Node.js
- Express.js
- REST API architecture
- JWT-based authentication
- Middleware for validation and request handling

The backend powers API routes, auth logic, interview orchestration, dashboard stats, and AI service integrations.

### Database
- MongoDB
- Mongoose ODM

MongoDB stores user profiles, interview results, generated reports, and learning progress.

### AI / LLM layer
- Google Gemini / GenAI
- Prompt-driven analysis for interviews and evaluation
- Structured output generation for scores, recommendations, and skill insights

The AI layer is responsible for:
- resume-to-role matching
- interview feedback generation
- skill gap recommendations
- personalized roadmap suggestions
- mock interview evaluation

### Security and configuration
- JWT authentication
- protected routes
- environment-variable based configuration
- secure API access patterns

---

## Project structure

```text
interview-pro/
├── Backend/
│   ├── src/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── Frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── README.md
├── package.json
├── requirements.txt
└── .gitignore
```

---

## Real-world workflow

1. A user signs in to the app.
2. They upload a resume and a target job description.
3. The AI engine compares both and highlights weak areas.
4. A custom interview prep plan is generated.
5. The user starts a mock interview and answers questions.
6. AI evaluates the response and returns feedback, scores, and suggestions.
7. The dashboard updates with progress and improvement tracking.

This makes the app feel like a real interview-preparation SaaS product instead of a basic demo.

---

## Getting started

### 1. Install dependencies

```bash
npm install
cd Frontend && npm install
cd ../Backend && npm install
```

### 2. Configure environment variables

Create environment files with your own credentials.

```bash
# Backend .env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/interview-assistant
GEMINI_API_KEY=your_gemini_api_key
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

### 4. Open the app

Visit:

```bash
http://localhost:5173
```

---

## Production-ready vision

This project is designed to behave like a real-life interview assistant platform for:

- job seekers
- career switchers
- fresh graduates
- experienced professionals preparing for interviews

It is not just a demo app; it is structured around real interview-coaching workflows, analytics, and AI feedback loops that can grow into a production SaaS product.

---

## License

MIT
