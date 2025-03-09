import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import Map from "./pages/Map";
import About from "./pages/About";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/map" element={<Map />} />
        <Route path="about" element={<About />} />
      </Routes>
    </>
  );
}

