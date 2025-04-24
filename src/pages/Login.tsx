
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
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/80 backdrop-blur-sm border-gray-200 focus:border-[#2AA9DD] focus:ring-[#2AA9DD]/20"
            />
          </div>
          
          <div className="mb-6 relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/80 backdrop-blur-sm border-gray-200 focus:border-[#2AA9DD] focus:ring-[#2AA9DD]/20"
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
            <a href="#" className="text-sm text-[#2AA9DD] hover:text-[#2AA9DD]/80">
              Forgot password?
            </a>
          </div>
          
          <Button
            type="submit"
            className="w-full bg-[#1E2539] text-white hover:bg-[#1E2539]/90 transition-all shadow-lg"
          >
            Log in
          </Button>
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
    <div className="min-h-screen bg-gradient-to-b from-[#2AA9DD]/40 to-white">
      {/* 3D Card Container */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo Header */}
          <div className="mb-8 flex justify-center">
            <img 
              src="/lovable-uploads/cba4a2dc-5021-4756-98a0-b154222d7523.png" 
              alt="Khelmanch Logo" 
              className="h-12 w-auto" 
            />
          </div>

          {/* 3D Card Effect */}
          <div className="relative bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(8,112,184,0.2)] border border-white/20 backdrop-blur-sm transform transition-all hover:scale-[1.01] hover:shadow-[0_20px_60px_rgba(8,112,184,0.3)]">
            
            {/* Gradient Header */}
            <div className="h-12 bg-gradient-to-r from-[#1E2539] via-[#2AA9DD] to-[#DFE61C] relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('/lovable-uploads/c76e1b08-2001-4139-b4b8-fe8e25d22399.png')] bg-cover opacity-20 mix-blend-overlay"></div>
            </div>
            
            {/* Card Content */}
            <div className="p-8">
              <h2 className="text-2xl font-semibold text-[#1E2539] mb-1">Welcome Back</h2>
              <p className="text-gray-500 mb-6">Sign in to continue to Khelmanch</p>
              
              {/* Auth Method Tabs */}
              <div className={`mb-6 flex border-b border-gray-200 transition-all duration-700 delay-400 transform ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <button
                  onClick={() => setAuthMethod("email")}
                  className={`flex items-center justify-center py-3 flex-1 text-sm font-medium ${authMethod === "email" ? "text-[#2AA9DD] border-b-2 border-[#2AA9DD]" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <Mail size={16} className="mr-2" />
                  Email
                </button>
                <button
                  onClick={() => {setAuthMethod("phone"); setOtpSent(false);}}
                  className={`flex items-center justify-center py-3 flex-1 text-sm font-medium ${authMethod === "phone" ? "text-[#2AA9DD] border-b-2 border-[#2AA9DD]" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <Smartphone size={16} className="mr-2" />
                  Phone
                </button>
              </div>

              {/* Auth Form */}
              <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-6" 
                onSubmit={(e) => e.preventDefault()}
              >
                {renderAuthMethod()}
              </motion.form>

              {/* Divider */}
              <div className="my-8 flex items-center">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-4 text-sm text-gray-500">OR</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div>

              {/* Social Login */}
              <div className="space-y-4">
                <GoogleLoginButton />
                <BiometricLoginButton />
              </div>

              {/* Register Link */}
              <div className="mt-8 text-center text-sm">
                <span className="text-gray-600">Don't have an account?</span>{" "}
                <Link to="/register" className="text-[#2AA9DD] font-medium hover:text-[#2AA9DD]/80">
                  Create Account
                </Link>
              </div>

              {/* Skip Login */}
              <div className="mt-6">
                <button 
                  onClick={handleSkipLogin}
                  className="w-full text-gray-500 hover:text-gray-700 text-sm"
                >
                  Skip Login for Now
                </button>
              </div>
            </div>
          </div>
          
          {/* Floating 3D Elements */}
          <div className="absolute top-20 left-10 w-12 h-12 rounded-full bg-[#DFE61C]/30 backdrop-blur-md transform rotate-12 -z-10"></div>
          <div className="absolute bottom-40 right-10 w-16 h-16 rounded-full bg-[#2AA9DD]/20 backdrop-blur-md -z-10"></div>
        </motion.div>
      </div>
      
      <RecaptchaContainer />
    </div>
  );
}
