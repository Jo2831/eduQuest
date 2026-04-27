# EduQuest — UAE Space Explorer

A gamified educational quiz app with a space exploration theme celebrating UAE's achievements in space missions. Built with Next.js 16, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **6 Interactive Missions** — Progressive difficulty quiz levels on space and UAE space exploration
- **Level Unlock System** — Missions progressively unlock as you complete previous ones (stored in localStorage)
- **Score Tracking** — Cumulative score persists across sessions
- **UAE Flag Component** — Custom SVG flag to replace emoji (emoji shows as "AE" text on Windows)
- **Smooth Animations** — Entrance, hover, and result animations using Framer Motion
- **Space Theme** — Dark gradient backgrounds with glassmorphism UI and green UAE accent colors

## Tech Stack

- **Next.js 16.2.4** — App Router, TypeScript
- **Tailwind CSS v4** — Responsive, utility-first styling
- **Framer Motion** — Animations and transitions
- **localStorage** — Client-side data persistence

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── page.tsx          # Home page — Mission Control landing
├── layout.tsx        # Global layout
├── map/
│   └── page.tsx      # Level map with 6 missions
└── quiz/
    └── page.tsx      # Quiz game page

src/componets/
├── QuizCard.tsx      # Quiz question and answer options
├── LevelNode.tsx     # Level button with lock state
└── UAEFlag.tsx       # Custom UAE flag SVG
```

## How It Works

1. **Home** — Land on Mission Control
2. **Map** — Choose a mission (start at Mission 1, unlock higher levels on success)
3. **Quiz** — Answer space trivia questions
4. **Score** — Earn 10 points per correct answer (persistent across sessions)
5. **Progress** — Complete missions to unlock the next level

## localStorage Schema

- `unlockedLevel` — Highest mission number player has unlocked (default: 1)
- `totalScore` — Cumulative score across all completed missions

## License

MIT
