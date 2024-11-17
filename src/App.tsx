import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import CanvasPage from "./pages/Canvas"
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/canvas" element={<CanvasPage />} />
      </Routes>
    </Router>
  )
}

export default App
