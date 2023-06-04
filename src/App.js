import { Routes, Route, NavLink } from "react-router-dom";
import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";

import Pages from "./Pages/Page";
import Cuisine from "./Pages/Cuisine";
import DetailsPage from "./Pages/DetailsPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles.css";

import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function App() {
  const getActiveStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "orange" : "black",
    fontweight: isActive ? "600" : "",
  });

  const location = useLocation();
  return (
    <div className="App">
      <Header />
      <div className="btns-list">
        <NavLink to="cuisine/italian" style={getActiveStyle}>
          {" "}
          <div>
            <FaPizzaSlice />
            <h4>Italian</h4>
          </div>
        </NavLink>
        <NavLink to="cuisine/american" style={getActiveStyle}>
          {" "}
          <div>
            <FaHamburger />
            <h4>American</h4>
          </div>
        </NavLink>
        <NavLink to="cuisine/thai" style={getActiveStyle}>
          {" "}
          <div>
            <GiNoodles />
            <h4>Thai</h4>
          </div>
        </NavLink>
        <NavLink to="cuisine/japanese" style={getActiveStyle}>
          {" "}
          <div>
            <GiChopsticks />
            <h4>Japanese</h4>
          </div>
        </NavLink>
        '
      </div>
      <AnimatePresence mode="wait">
        <Routes Location={location} key={location.pathname}>
          <Route path="/" element={<Pages />} />
          <Route path="/cuisine/:type" element={<Cuisine />} />
          <Route path="/details/:recipeID" element={<DetailsPage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
