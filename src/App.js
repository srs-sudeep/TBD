import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from './context/AuthContext';
import Signin from './Pages/Signin';
import Signup from './Pages/SignUp';
import Home from './Pages/Home';
import CompanyDetails from './Pages/CompanyDetails';
import LandingPage from './Pages/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import Inventory from "./Pages/Inventory";
import Sale from "./Pages/Sale";
import Purchase from "./Pages/Purchase";
import PurchaseForm from "./Pages/PurchaseForm";
import SaleForm from "./Pages/SaleForm";
import Profile from "./Pages/profile";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/companydetails'
            element={
              <ProtectedRoute>
                <CompanyDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path='/home'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path='/inventory' element={<Inventory />} />
          <Route path='/sale' element={<Sale />} />
          <Route path='/purchase' element={<Purchase />} />
          <Route path='/purchaseform' element={<PurchaseForm />} />
          <Route path='/saleform' element={<SaleForm />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
