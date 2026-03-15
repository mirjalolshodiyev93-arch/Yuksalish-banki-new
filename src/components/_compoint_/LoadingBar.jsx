import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

// Loading bar dizaynini sozlash (rangini Navbaringizga moslaymiz)
nProgress.configure({ 
  showSpinner: false, 
  speed: 500, 
  minimum: 0.2 
});

export default function LoadingBar() {
  const location = useLocation();

  useEffect(() => {
    // Sahifa o'zgarganda loading boshlanadi
    nProgress.start();
    
    // Sahifa yuklanib bo'lgach (yoki render tugagach) loading tugaydi
    const timer = setTimeout(() => {
      nProgress.done();
    }, 300); // 300ms dan keyin tugatish (vizual chiroyli chiqishi uchun)

    return () => {
      clearTimeout(timer);
      nProgress.done();
    };
  }, [location]); // Har gal URL o'zgarganda ishlaydi

  return null;
}