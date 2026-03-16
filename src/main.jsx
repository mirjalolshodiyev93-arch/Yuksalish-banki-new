import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react"; 
import App from "./App";
import "./index.css";
import "./i18n";
import ScrolltopFunc from "./components/skroll/ScrolltopFunc";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <BrowserRouter>
      <App />
      <ScrolltopFunc />
    </BrowserRouter>
  </ClerkProvider>
);