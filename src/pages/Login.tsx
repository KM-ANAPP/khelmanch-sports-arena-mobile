import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { useLoginForm } from "@/hooks/useLoginForm";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";
import { BiometricLoginButton } from "@/components/auth/BiometricLoginButton";
import { PhoneLoginForm } from "@/components/auth/PhoneLoginForm";
import { RecaptchaContainer } from "@/components/auth/RecaptchaContainer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [authMethod, setAuthMethod] = useState("phone");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const {
    phoneNumber,
    setPhoneNumber,
    loadingState,
    otpSent,
    setOtpSent,
    otp,
    setOtp,
    is2FARequired,
    handleSendOTP,
    handleLoginWithOTP,
    retryOTP,
    isRecaptchaVerifying
  } = useLoginForm();

  // Animation effect on load
  useEffect(() => {
    setTimeout(() => {
      setAnimated(true);
    }, 300);
  }, []);

  const handleSkipLogin = () => {
    toast({
      title: "Guest Mode",
      description: "You are browsing as a guest. Some features may be limited.",
    });
    navigate("/home");
  };

  const renderAuthMethod = () => {
    if (authMethod === "email") {
      return (
        <>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#DFE61C]"
            />
          </div>
          
          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#DFE61C]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <div className="mb-6 text-right">
            <a href="#" className="text-sm text-[#DFE61C] hover:text-[#DFE61C]/80">
              Forgot password?
            </a>
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#1E2539] text-[#DFE61C] py-3 rounded-lg hover:bg-[#1E2539]/90 transition-colors shadow-md"
          >
            Log in
          </button>
        </>
      );
    }
    
    return (
      <PhoneLoginForm
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        otpSent={otpSent}
        setOtpSent={setOtpSent}
        otp={otp}
        setOtp={setOtp}
        isGeneratingOTP={loadingState.isGeneratingOTP}
        handleSendOTP={handleSendOTP}
        handleLoginWithOTP={handleLoginWithOTP}
        retryOTP={retryOTP}
        isRecaptchaVerifying={isRecaptchaVerifying}
      />
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Gradient Header */}
      <div className="h-80 bg-gradient-to-b from-cyan-400 to-cyan-600 rounded-b-[3rem] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10"></div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-24" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M0,100 C30,50 70,50 100,100"
              fill="white"
              className="shadow-lg"
            />
          </svg>
        </div>
      </div>

      {/* Login Form */}
      <div className="px-8 -mt-40 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <h1 className="text-3xl font-semibold text-center text-white mb-8">
            Welcome back
          </h1>

          {/* Auth Method Tabs */}
          <div className={`mb-6 flex border-b transition-all duration-700 delay-400 transform ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={() => setAuthMethod("email")}
              className={`flex items-center justify-center py-3 flex-1 text-sm font-medium ${authMethod === "email" ? "text-[#DFE61C] border-b-2 border-[#DFE61C]" : "text-gray-500 hover:text-gray-700"}`}
            >
              <Mail size={16} className="mr-2" />
              Email
            </button>
            <button
              onClick={() => {setAuthMethod("phone"); setOtpSent(false);}}
              className={`flex items-center justify-center py-3 flex-1 text-sm font-medium ${authMethod === "phone" ? "text-[#DFE61C] border-b-2 border-[#DFE61C]" : "text-gray-500 hover:text-gray-700"}`}
            >
              <Smartphone size={16} className="mr-2" />
              Phone
            </button>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {renderAuthMethod()}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-cyan-600 font-medium">
                Create Account
              </Link>
            </p>
          </div>

          {/* Skip Login Button */}
          <div className="mt-4">
            <button 
              onClick={handleSkipLogin}
              className="w-full text-gray-500 hover:text-gray-700 text-sm"
            >
              Skip Login for Now
            </button>
          </div>
        </motion.div>
      </div>
      
      <RecaptchaContainer />
    </div>
  );
}
