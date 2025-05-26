# Rune Hunt

![Rune Hunt](https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnJtNGxsZmF6aXVqcnV6eDgweXAxaDlzNmk2ZmM5M2plaGE4Nzd1aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohs83ZGJ3hC3yc5Dq/giphy.gif)

Rune is on a party but he's having a bit too much fun, your job is to stop him. Aim the champagne cork at him and shoot your shot. Try and hit as many Rune's as possible before the time runs out, but watch out, you might shoot someone you don't want to! 

## 🎮 Overview
Rune Hunt is a Next.js-based casual click-based game where players use a champagne bottle cursor to catch bouncing Rune characters within a time limit. The game features an integrated payment system and reward mechanism, allowing players to pay to play and earn rewards based on their performance. Players can select from different themed backgrounds, collect points, and save their scores to a global leaderboard.

## ✨ Features

- **Payment Integration**: JWT-authenticated payment system for game access (€2 entry fee)
- **Reward System**: 
 - Playing: Earn a stamp - Silver Blobfish
 - Score 150+ points: Earn €3 cash reward + stamp
- **Multiple Game Stages**: Choose from four visually distinct backgrounds (Beach Club, Coachella, Forest Rave, After Ski)
- **Dynamic Gameplay**: 
 - Regular Runes bounce with random velocity (+10 points each)
 - Bad Runes appear temporarily and penalize players (-25 points)
- **Advanced Animation**: Runes alternate between "alive" and "dead" sprites with smooth transitions
- **Score Tracking**: Points system with Supabase-backed high score persistence
- **Global Leaderboard**: Save your score to compete with other players
- **Responsive Design**: Optimized for both desktop and mobile with orientation detection
- **Background Music**: Immersive audio experience with "denLillaRödaPandan" theme song

## 🎯 Game Mechanics

1. **Payment**: Players must authenticate and pay €2 to access the game
2. **Objective**: Click on as many good Rune characters as possible within 45 seconds
3. **Controls**: Use mouse cursor (champagne bottle) or touch on mobile
4. **Scoring**: 
  - Good Runes: +10 points
  - Bad Runes (red overlay): -25 points
5. **Bad Runes**: Spawn randomly every 1-2 seconds and disappear after 5 seconds
6. **Rewards**: Based on final score, players can claim stamps or cash rewards
7. **Leaderboard**: Save scores to compete globally

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Supabase account (for leaderboard)
- External API access for transactions

### Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/Skjesper/GoldenBeetlebug.git
  cd rune-hunt
  Install dependencies:
npm install
# or
yarn install
Create a .env.local file with your configuration:
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Configuration
API_KEY=your_external_api_key
API_URL=http://localhost:3000  # or your external API URL
Start the development server:
npm run dev
# or
yarn dev

Open your browser and navigate to http://localhost:3000

Building for Production
bashnpm run build
npm start
🛠️ Tech Stack
Frontend

Next.js 14: React framework with App Router
TypeScript: Type safety and better developer experience
Emotion: CSS-in-JS styling with styled components
React Context: State management for game and authentication
Canvas API: High-performance game rendering
Web Audio API: Background music integration

Backend & Database

Next.js API Routes: Server-side transaction processing
Supabase: PostgreSQL database for leaderboard
JWT: Token-based authentication
External API: Payment and reward processing

Game Engine

Custom Canvas Renderer: Optimized game loop with requestAnimationFrame
RuneGenerator: Procedural generation of game objects
Physics Engine: Collision detection and boundary physics
Asset Management: Image loading and caching system

🗃️ Database Setup
The game uses Supabase as its backend. You'll need to create a table called scores with the following structure:
sqlCREATE TABLE scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nickname TEXT NOT NULL,
  points INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

🔐 API Integration
Transaction Flow

Payment: POST to /api/transactions with stake_amount
Game Play: Local game processing with score calculation
Reward Claiming: POST to /api/transactions with payout_amount/stamp_id

Authentication

JWT tokens received from parent application
Token validation on all API requests
Secure transaction processing with external API

Game Configuration
typescriptGAME_CONFIG = {
  AMUSEMENT_ID: 8,
  GROUP_ID: 3,
  COST: 2.0, 
  CURRENCY: "EUR",
  STAMP_ID: 19
}
📱 Responsive Design

Desktop: Full-featured gameplay with mouse controls
Mobile: Touch-optimized controls with device detection
Orientation Lock: Landscape mode required for optimal experience
Dynamic Sizing: Adaptive canvas and UI scaling

🎵 Assets

Audio: Background music with Web Audio API
Images: Animated Rune sprites (alive/dead states)
Cursors: Custom champagne bottle cursor
Backgrounds: Four themed stage environments

📄 License
This project is licensed under the MIT License - see the LICENSE.md file for details.

Made with ❤️ by Anna Dahlberg, Jesper Skeppstedt & Julia Lyngfelt