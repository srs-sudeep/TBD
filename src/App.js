import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Signin from "./Pages/Signin";
import Signup from "./Pages/SignUp";
import Home from "./Pages/Home";
import CompanyDetails from "./Pages/CompanyDetails";
import Landing from "./Pages/Landing";
import ProtectedRoute from "./components/ProtectedRoute";
import Inventory from "./Pages/Inventory";
import Sale from "./Pages/Sale";
import Purchase from "./Pages/Purchase";
import PurchaseForm from "./Pages/PurchaseForm";
import SaleForm from "./Pages/SaleForm";
import Profile from "./Pages/profile";
import Error from "./Pages/Error";
import { Background, Navbar, Sidebar } from "./components";
import { createContext, useState } from "react";

export const DarkModeContext = createContext(null);

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const style = {
    display: "flex",
  };

  return (
    <div>
      <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
        <AuthContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/companydetails"
              element={
                <ProtectedRoute>
                  <CompanyDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Sidebar />
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/inventory"
              element={
                <div style={style}>
                  <Sidebar />
                  <Inventory />
                </div>
              }
            />
            <Route
              path="/sale"
              element={
                <div style={style}>
                  <Sidebar />
                  <Sale />
                </div>
              }
            />
            <Route
              path="/purchase"
              element={
                <div style={style}>
                  <Sidebar />
                  <Purchase />
                </div>
              }
            />
            <Route
              path="/purchaseform"
              element={
                <div style={style}>
                  <Sidebar />
                  <PurchaseForm />
                </div>
              }
            />
            <Route
              path="/saleform"
              element={
                <div style={style}>
                  <Sidebar />
                  <SaleForm />
                </div>
              }
            />
            <Route
              path="/profile"
              element={
                <div style={style}>
                  <Sidebar />
                  <Profile />
                </div>
              }
            />
            <Route path="*" element={<Error />} />
          </Routes>
          <Background />
        </AuthContextProvider>
      </DarkModeContext.Provider>
    </div>
  );
}

export default App;
