import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/_compoint_navbar/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Register from "./pages/Register";

import Kredit from "./components/_compoint_/Kredit";


import { UserProvider } from "./context/UserContext";

import Deposits1 from "./components/_compoint_/OmonatOchish";

import USDPage from "./components/404/USDPage";
import EURPage from "./components/404/EURPage";
import GBPPage from "./components/404/GBPPage";
import RUBPage from "./components/404/RUBPage";
import NotFound from "./components/404/NotFound";

// Dashboard pages
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Transactions from "./pages/Transactions";
import Srm from "./pages/Srm";
import Dashboard from "./pages/Dashboard";
import ErrorBoundary from "./context/ErrorBoundary";
import Transfer from "./pages/Transfer";
import AboutUs from "./components/components/AboutUs";
      import CardSection from "./components/components/CardSection";

import Contacts from "./components/components/Contactkar";
import Deposits from "./components/components/Deposits";
import OpenAccount from "./components/components/OpenAccount";
import CardMap from "./components/CardMap";


function App() {
  const location = useLocation();

  // 404 sahifa uchun tekshiruv
  const isNotFound = location.pathname === "/404";

  return (
    <ErrorBoundary>
      <UserProvider>
        {/* Navbar faqat 404 bo'lmaganida */}
        {!isNotFound && <Navbar />}

        <Routes>
          {/* Bosh sahifalar */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/hisob-ochish" element={<OpenAccount />} />
          <Route path="/register" element={<Register />} />
       
          <Route path="/salom/usd" element={<USDPage />} />
           <Route path="/map" element={<CardMap />} />
          <Route path="/salom/eur" element={<EURPage />} />
          <Route path="/salom/gbp" element={<GBPPage />} />
          <Route path="/salom/rub" element={<RUBPage />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/kredit" element={<Kredit />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/card" element={<CardSection />} />
          <Route path="/omonat" element={<Deposits />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/omonat/deposits" element={<Deposits1 />} />

          {/* Dashboard nested route */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="profile" replace />} /> {/* default sahifa */}
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="srm" element={<Srm />} />
          </Route>

          {/* 404 */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>

        {/* ChatBot va Footer faqat 404 bo'lmaganida */}
     
        {!isNotFound && <Footer />}
      </UserProvider>
    </ErrorBoundary>
  );
}

export default App;