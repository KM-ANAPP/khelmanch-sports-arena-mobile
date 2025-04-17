
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function SplashScreen() {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setRedirect(true);
    }, 2500); // 2.5 seconds as per requirement

    return () => clearTimeout(timer);
  }, []);

  if (redirect) {
    // If user is not logged in, redirect to login page
    // For demo purposes, always redirect to login
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary">
      <div className="animate-pulse">
        <img 
          src="/src/assets/logos/khelmanch-logo.svg" 
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
