import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditUser from "./components/edit";
import Home from "./components/home";
import { Box } from "@mui/material";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <Box sx={{ maxWidth: 800, margin: "80px auto" }}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<EditUser />} />
      </Routes>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Box>,
);
