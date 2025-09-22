import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Resume from "./Resume.jsx";
import Button from "./Button.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Resume /> */}
    <Button />
  </StrictMode>
);
