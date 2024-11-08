import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import AdminContextProvider from "./context/AdminContext.jsx"
import AppContextProvider from "./context/AppContext.jsx"
import UserContextProvider from "./context/UserContext.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AdminContextProvider>
        <UserContextProvider>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </UserContextProvider>
      </AdminContextProvider>
    </BrowserRouter>
  </StrictMode>
);
