import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import EndPage from "./pages/EndPage";
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/runesbeachclub" element={<GamePage />} />
        <Route path="/result" element={<EndPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
