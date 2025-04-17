import { useEffect } from "react";
import { Navigate } from "react-router-dom";

// This file is now just a redirect to the Home page 
// We're keeping it for backward compatibility
export default function Index() {
  useEffect(() => {
    console.log("Redirecting from legacy Index page to Home");
  }, []);

  return <Navigate to="/" replace />;
}
