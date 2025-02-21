import { useContext } from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import AllContext from "../contexts/AllContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(AllContext);
  return (
    <div className="bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-black/5 rounded-lg p-4 md:p-6 shadow-lg flex justify-between">
      <Link to={"/"}>
        <h1 className="font-bold text-3xl">
          Task<span className="text-pink-300">.</span>it
        </h1>
      </Link>
      <button
        onClick={toggleDarkMode}
        className="shadow-sm relative w-14 h-8 flex items-center bg-white/20 dark:bg-black/20 rounded-full p-1 transition duration-300"
      >
        <BsSun
          className={`absolute left-2 text-white transition-opacity duration-300 ${
            darkMode ? "opacity-100" : "opacity-0"
          }`}
          size={14}
        />

        <BsMoon
          className={`absolute right-2 text-black transition-opacity duration-300 ${
            darkMode ? "opacity-0" : "opacity-100"
          }`}
          size={14}
        />

        <div
          className={` absolute left-1 w-6 h-6 bg-black rounded-full shadow-md transition-transform duration-300 ${
            darkMode ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </button>
    </div>
  );
};

export default Navbar;
