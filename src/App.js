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
import { Background, Navbar } from "./components";
function App() {
  return (
    <div>
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
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/purchaseform" element={<PurchaseForm />} />
          <Route path="/saleform" element={<SaleForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Background />
      </AuthContextProvider>
    </div>
  );
}

export default App;
