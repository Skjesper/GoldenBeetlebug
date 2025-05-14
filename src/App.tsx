import { BrowserRouter, Routes, Route } from "react-router-dom";
import RuneHuntPage from "./pages/RuneHuntPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import PlayPage from "./pages/PlayPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RuneHuntPage />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
