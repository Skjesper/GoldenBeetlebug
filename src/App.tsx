import { BrowserRouter, Routes, Route } from "react-router-dom";
import RuneHuntPage from "./pages/RuneHuntPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import PlayPage from "./pages/PlayPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/runehunt/start" element={<RuneHuntPage />} />
        <Route path="/runehunt/play" element={<PlayPage />} />
        <Route path="/runehunt/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
