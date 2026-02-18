import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // <-- must be first
import AdminApp from "./App";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error('Root element "#root" not found.');

const root = ReactDOM.createRoot(rootEl);
root.render(
  <React.StrictMode>
    <AdminApp />
  </React.StrictMode>
);