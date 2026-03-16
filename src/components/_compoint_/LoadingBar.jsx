import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

nProgress.configure({ 
  showSpinner: false, 
  speed: 500, 
  minimum: 0.2 
});

export default function LoadingBar() {
  const location = useLocation();

  useEffect(() => {
    nProgress.start();
    
    const timer = setTimeout(() => {
      nProgress.done();
    }, 300);

    return () => {
      clearTimeout(timer);
      nProgress.done();
    };
  }, [location]); 

  return null;
}