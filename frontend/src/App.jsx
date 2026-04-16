import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Events from "./pages/Events";
import About from "./pages/About";
import Sermons from "./pages/Sermons";
import Connect from "./pages/Connect";
import Beliefs from "./pages/Beliefs";
import Help from "./pages/Help";
import Donations from "./pages/Donations";
import Ministries from "./pages/Ministries";
import Men from "./pages/Ministries/Men";
import Women from "./pages/Ministries/Women";
import Youth from "./pages/Ministries/Youth";
import Kids from "./pages/Ministries/Kids";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<About />} />
        <Route path="/sermons" element={<Sermons />} />
        <Route path="/contact" element={<Connect />} />
        <Route path="/beliefs" element={<Beliefs />} />
        <Route path="/help" element={<Help />} />
        <Route path="/donations" element={<Donations />} />

        <Route path="/ministries" element={<Ministries />}>
          <Route path="men" element={<Men />} />
          <Route path="women" element={<Women />} />
          <Route path="youth" element={<Youth />} />
          <Route path="kids" element={<Kids />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;