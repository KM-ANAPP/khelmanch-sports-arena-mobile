
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function SplashScreen() {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirect(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (redirect) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary">
      <div className="animate-pulse">
        <img 
          src="/src/assets/logos/khelmanch-logo.png" 
          alt="Khelmanch" 
          className="w-64 h-auto"
        />
      </div>
      <div className="mt-8">
        <div className="w-16 h-1 bg-accent rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
