
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
    <div className="min-h-screen bg-[#1E2539] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md overflow-hidden rounded-3xl shadow-xl"
      >
        {/* Gradient Header with Waves */}
        <div className="relative h-56 bg-[#1E2539]">
          {/* Logo Placeholder */}
          <div className={`pt-10 flex justify-center transition-all duration-1000 transform ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'}`}>
            <div className="w-16 h-16 rounded-full bg-[#1E2539] shadow-md flex items-center justify-center p-1">
              <img 
                src="/lovable-uploads/cba4a2dc-5021-4756-98a0-b154222d7523.png" 
                alt="Khelmanch Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          
          {/* First Wave */}
          <div className="absolute bottom-8 left-0 right-0 h-16 bg-gray-100 rounded-t-full opacity-20"></div>
          
          {/* Second Wave */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white rounded-t-full"></div>
        </div>
        
        {/* Login Form Section */}
        <div className="bg-white px-8 pt-4 pb-10 rounded-b-3xl">
          {/* Welcome Back Text with Animation */}
          <div className={`mb-6 transition-all duration-1000 delay-300 transform ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h2 className="text-2xl font-semibold text-gray-800 text-center">Welcome to Khelmanch</h2>
            <p className="text-center text-gray-500 mt-1">Please sign in to continue</p>
          </div>

          <BiometricLoginButton />
          
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
          
          <form onSubmit={(e) => e.preventDefault()} className={`transition-all duration-700 delay-500 transform ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {renderAuthMethod()}
          </form>
          
          {/* OAuth Separator */}
          <div className={`my-8 flex items-center transition-all duration-700 delay-700 transform ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>
          
          {/* Google Sign In */}
          <div className={`transition-all duration-700 delay-800 transform ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <GoogleLoginButton />
          </div>
          
          {/* Sign Up Link */}
          <div className={`mt-8 text-center text-sm transition-all duration-700 delay-900 transform ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-gray-600">Don't have an account?</span>{" "}
            <Link to="/register" className="text-[#DFE61C] font-medium hover:text-[#DFE61C]/80">
              Register now
            </Link>
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
        </div>
      </motion.div>
      
      <RecaptchaContainer />
    </div>
  );
}
