import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import MerchantOnboarding from "./pages/merchant-onboarding";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/merchant/onboarding" element={<MerchantOnboarding />} />
          <Route path="/checkout/:merchant/:id" element={<CheckoutPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
