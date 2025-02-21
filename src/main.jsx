import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import AllProvider from "./Provider/AllProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AllProvider>
      <RouterProvider router={routes} />
    </AllProvider>
  </StrictMode>
);
