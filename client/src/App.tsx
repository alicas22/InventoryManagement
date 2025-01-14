import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import InvoiceList from "./pages/InvoiceList";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material";
import { Provider, useSelector } from "react-redux";
import { store } from "./store";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useGetCurrentUserQuery } from "./store/api/apiSlice";

const theme = createTheme();

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { isLoading } = useGetCurrentUserQuery();
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
            <div className="flex h-screen">
              {isAuthenticated && <Sidebar isOpen={isSidebarOpen} />}
              <div className="flex-1 flex flex-col">
                {isAuthenticated && <Header toggleSidebar={toggleSidebar} />}
                <main className={`flex-1 overflow-auto ${!isAuthenticated ? 'pt-0' : ''}`}>
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                      path="/invoices"
                      element={
                        <ProtectedRoute>
                          <InvoiceList />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/"
                      element={<Navigate to="/invoices" replace />}
                    />
                  </Routes>
                </main>
              </div>
            </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
