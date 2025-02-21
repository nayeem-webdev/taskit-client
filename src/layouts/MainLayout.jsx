import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";

import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AllContext from "../contexts/AllContext";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  const { darkMode } = useContext(AllContext);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        transition:Bounce
      />
      <div
        className="min-h-screen p-4 md:p-8 bg-cover bg-center"
        style={{
          background: `url(${
            darkMode
              ? "https://i.ibb.co.com/FqVpBvNW/bgd.jpg"
              : "https://i.ibb.co.com/0RpMdXGK/bgl.jpg"
          }) center/cover no-repeat`,
        }}
      >
        <div className="container mx-auto flex flex-col gap-4 md:gap-8">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
