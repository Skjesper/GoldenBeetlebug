# Runes Beach Club

![Rune Hunt](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnJtNGxsZmF6aXVqcnV6eDgweXAxaDlzNmk2ZmM5M2plaGE4Nzd1aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohs83ZGJ3hC3yc5Dq/giphy.gif)

Rune is on vacation but he's having a bit too much fun, your job is to stop him. Aim the champagne cork at him and shoot your shot. Try and hit as manny Rune's as possible befor the time runs out. 

## 🎮 Overview
Rune Hunt is a casual click-based game where players use a champagne bottle cursor to catch bouncing Rune characters within a time limit. Players can select from different themed backgrounds, collect points, and save their scores to a global leaderboard.

## ✨ Features

- **Multiple Game Stages**: Choose from four visually distinct backgrounds (Beach Club, Coachella, Forest Rave, After Ski)
- **Dynamic Gameplay**: Runes bounce with random velocity across the screen
- **Score Tracking**: Points system with local high score persistence
- **Global Leaderboard**: Save your score to compete with other players
- **Responsive Design**: Layout adapts to different screen sizes (with portrait orientation warning)
- **Stylish UI**: Custom-designed interface with themed elements

## 🎯 Game Mechanics

1. **Objective**: Click on as many Rune characters as possible within the time limit (30 seconds)
2. **Controls**: Use your mouse/cursor (styled as a champagne bottle) to catch Runes, or finger/touch on mobile
3. **Scoring**: Each caught Rune gives 10 points
4. **Timer**: A countdown timer shows your remaining time
5. **Game Over**: When the timer reaches zero, the game ends and displays your score
6. **Leaderboard**: After the game, you can save your score to the leaderboard

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Supabase account (for leaderboard functionality)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rune-hunt.git
   cd rune-hunt
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   API_KEY=yourapikeyhere
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

## 🛠️ Tech Stack

- **React**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and development server
- **Emotion**: CSS-in-JS styling
- **React Router**: Navigation between pages
- **Supabase**: Backend for leaderboard functionality

## 🗃️ Database Setup

The game uses Supabase as its backend. You'll need to create a table called `scores` with the following structure:

```sql
CREATE TABLE scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nickname TEXT NOT NULL,
  points INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for faster leaderboard queries
CREATE INDEX scores_points_idx ON scores (points DESC);
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE.md file for details.

---

Made with ❤️ by Anna Dahlberg, Jesper Skeppstedt & Julia Lyngfelt