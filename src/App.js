import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
    </Routes>
  );
}

export default App;
