import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Routes from "./Routes.tsx";
import { AuthProvider } from "./pages/Login/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      
      <Routes />
    </AuthProvider>
   
  </StrictMode>,
);
