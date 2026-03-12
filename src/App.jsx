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

import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Transactions from "./pages/Transactions";
import Srm from "./pages/Srm";
import Dashboard from "./pages/Dashboard";
import ErrorBoundary from "./context/ErrorBoundary";
import AutoKredit from "./components/_compoint_navbar/AutoKredit";
import Transfer from "./pages/Transfer";
import AboutUs from "./components/components/AboutUs";
import CardSection from "./components/components/CardSection";

import Contacts from "./components/components/Contactkar";
import Deposits from "./components/components/Deposits";
import OpenAccount from "./components/components/OpenAccount";
import CardMap from "./components/CardMap";
import BusinessKredit from "./components/_compoint_navbar/BusinessKredit";
import CurrencyExchangePage from "./components/components/CurrencyExchangePage";
import IstemolKredit from "./components/_compoint_navbar/IstemolKredi";
import IpotekaKredit from "./components/_compoint_navbar/IpotekaKredit";
import CorporateServices from "./components/components/CorporateServices";
import BankingServices from "./context/BankingServices";



function App() {
  const location = useLocation();


  const isNotFound = location.pathname === "/404";

  return (
    <ErrorBoundary>
      <UserProvider>
      
        {!isNotFound && <Navbar />}

        <Routes>
      
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/hisob-ochish" element={<OpenAccount />} />
          <Route path="/corporateva" element={<CorporateServices/>} />
          <Route path="/BankingServices" element={<BankingServices/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/salom" element={<CurrencyExchangePage />} />
          <Route path="/salom/usd" element={<USDPage />} />
          <Route path="/map" element={<CardMap />} />
          <Route path="/salom/eur" element={<EURPage />} />
          <Route path="/salom/gbp" element={<GBPPage />} />
          <Route path="/salom/rub" element={<RUBPage />} />
          <Route path="/BusinessKredit" element={<BusinessKredit />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/kredit" element={<Kredit />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/card" element={<CardSection />} />
          <Route path="/omonat" element={<Deposits />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/omonat/deposits" element={<Deposits1 />} />
          <Route path="/autoKredit" element={<AutoKredit />} />
          <Route path="/IstemolKredit" element={<IstemolKredit />} />
          <Route path="/IpotekaKredit" element={<IpotekaKredit />} />



    
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="profile" replace />} /> 
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="srm" element={<Srm />} />
          </Route>

          {/* 404 */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>

        {!isNotFound && <Footer />}
      </UserProvider>
    </ErrorBoundary>
  );
}

export default App;