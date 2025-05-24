
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, Mail, ArrowRight, ChevronLeft, Check } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { useAuth } from '@/context/AuthContext';
import { Checkbox } from "@/components/ui/checkbox";
import wordpressService from '@/services/wordpressService';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  
  // Step 1: Contact Information
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isGeneratingOTP, setIsGeneratingOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  
  // Step 2: User Details
  const [name, setName] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  // Step 3: Sports and Preferences
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [skillLevels, setSkillLevels] = useState<Record<string, string>>({});
  
  const availableSports = ["Cricket", "Football", "Basketball", "Tennis", "Badminton", "Table Tennis"];
  const skillOptions = ["Beginner", "Intermediate", "Advanced", "Professional"];
  
  const handleSendOTP = () => {
    if (method === 'phone' && phoneNumber.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return;
    }
    
    if (method === 'email' && !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsGeneratingOTP(true);
    setTimeout(() => {
      setIsGeneratingOTP(false);
      setOtpSent(true);
      toast({
        title: "OTP Sent",
        description: method === 'phone' 
          ? `OTP sent to +91 ${phoneNumber}` 
          : `OTP sent to ${email}`,
      });
    }, 1500);
  };
  
  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }
    
    // Successfully verified OTP, move to step 2
    toast({
      title: "OTP Verified",
      description: "Phone number verified successfully!",
    });
    setStep(2);
  };
  
  const handleNextToSports = () => {
    if (!name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }
    
    if (!acceptedTerms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions",
        variant: "destructive",
      });
      return;
    }
    
    setStep(3);
  };
  
  const toggleSportSelection = (sport: string) => {
    if (selectedSports.includes(sport)) {
      setSelectedSports(selectedSports.filter(s => s !== sport));
      const newSkillLevels = { ...skillLevels };
      delete newSkillLevels[sport];
      setSkillLevels(newSkillLevels);
    } else {
      setSelectedSports([...selectedSports, sport]);
      setSkillLevels({ ...skillLevels, [sport]: "Beginner" });
    }
  };
  
  const setSkillLevel = (sport: string, level: string) => {
    setSkillLevels({ ...skillLevels, [sport]: level });
  };
  
  const handleCompleteRegistration = async () => {
    if (selectedSports.length === 0) {
      toast({
        title: "Sport Selection Required",
        description: "Please select at least one sport",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Register with WordPress first
      await wordpressService.registerUser({
        name,
        phone: method === 'phone' ? phoneNumber : undefined,
        email: method === 'email' ? email : undefined,
        sports: selectedSports,
        skillLevels
      });

      // Then register with local auth context
      await register({
        name,
        phone: method === 'phone' ? phoneNumber : undefined,
        email: method === 'email' ? email : undefined,
        sports: selectedSports,
        skillLevels
      });
      
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully!",
      });
      
      navigate('/home');
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <Tabs defaultValue={method} onValueChange={(v) => setMethod(v as 'phone' | 'email')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10">
                <TabsTrigger 
                  value="phone" 
                  className="text-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all hover:bg-blue-700/20"
                >
                  Phone
                </TabsTrigger>
                <TabsTrigger 
                  value="email" 
                  className="text-gray-200 data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all hover:bg-purple-700/20"
                >
                  Email
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="phone" className="space-y-4">
                {!otpSent ? (
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-200">Phone Number</Label>
                    <div className="flex space-x-2">
                      <div className="flex h-12 w-14 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm items-center justify-center font-medium text-gray-200 backdrop-blur-sm">
                        +91
                      </div>
                      <Input
                        id="phone"
                        placeholder="Enter phone number"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        className="h-12 rounded-xl text-base bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 backdrop-blur-sm"
                      />
                    </div>
                    <Button 
                      className="w-full h-12 mt-4 bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-xl text-base transition-all duration-200 shadow-md hover:shadow-lg" 
                      onClick={handleSendOTP}
                      disabled={phoneNumber.length !== 10 || isGeneratingOTP}
                    >
                      {isGeneratingOTP ? "Sending OTP..." : "Get OTP"}
                      <Phone className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-sm font-medium text-gray-200">Enter OTP</Label>
                    <Input
                      id="otp"
                      placeholder="Enter 6-digit OTP"
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="h-12 rounded-xl text-base text-center tracking-widest font-medium bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 backdrop-blur-sm"
                    />
                    <div className="text-sm text-gray-300 mt-2">
                      OTP sent to +91 {phoneNumber}
                    </div>
                    <Button 
                      className="w-full h-12 mt-4 bg-emerald-600 hover:bg-emerald-700 text-white border-0 rounded-xl text-base transition-all duration-200 shadow-md hover:shadow-lg" 
                      onClick={handleVerifyOTP}
                      disabled={otp.length !== 6}
                    >
                      Verify & Continue
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button 
                      variant="link" 
                      className="w-full text-gray-300 hover:text-white hover:no-underline" 
                      onClick={() => {
                        setOtpSent(false);
                        setOtp("");
                      }}
                    >
                      Change Phone Number
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="email" className="space-y-4">
                {!otpSent ? (
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-200">Email Address</Label>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 rounded-xl text-base bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 backdrop-blur-sm"
                    />
                    <Button 
                      className="w-full h-12 mt-4 bg-purple-600 hover:bg-purple-700 text-white border-0 rounded-xl text-base transition-all duration-200 shadow-md hover:shadow-lg" 
                      onClick={handleSendOTP}
                      disabled={!/^\S+@\S+\.\S+$/.test(email) || isGeneratingOTP}
                    >
                      {isGeneratingOTP ? "Sending OTP..." : "Get OTP"}
                      <Mail className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-sm font-medium text-gray-200">Enter OTP</Label>
                    <Input
                      id="otp"
                      placeholder="Enter 6-digit OTP"
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      className="h-12 rounded-xl text-base text-center tracking-widest font-medium bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 backdrop-blur-sm"
                    />
                    <div className="text-sm text-gray-300 mt-2">
                      OTP sent to {email}
                    </div>
                    <Button 
                      className="w-full h-12 mt-4 bg-emerald-600 hover:bg-emerald-700 text-white border-0 rounded-xl text-base transition-all duration-200 shadow-md hover:shadow-lg" 
                      onClick={handleVerifyOTP}
                      disabled={otp.length !== 6}
                    >
                      Verify & Continue
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button 
                      variant="link" 
                      className="w-full text-gray-300 hover:text-white hover:no-underline" 
                      onClick={() => {
                        setOtpSent(false);
                        setOtp("");
                      }}
                    >
                      Change Email
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
            
            <div className="pt-2">
              <Button 
                variant="ghost" 
                className="w-full text-gray-200 hover:bg-cyan-600/20 border border-cyan-500/30 hover:border-cyan-400/50 hover:text-cyan-200 transition-all"
                onClick={() => navigate('/login')}
              >
                Already have an account? Login
              </Button>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-200">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 rounded-xl text-base bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:ring-white/20 backdrop-blur-sm"
              />
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox 
                id="terms" 
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                className="border-white/20 data-[state=checked]:bg-white/20 data-[state=checked]:text-white"
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-200"
              >
                I accept the terms and conditions
              </label>
            </div>
            
            <div className="flex space-x-2 pt-4">
              <Button 
                variant="ghost" 
                onClick={() => {
                  setStep(1);
                  setOtpSent(false);
                  setOtp("");
                }}
                className="flex-1 text-gray-200 hover:bg-slate-600/20 border border-slate-500/30 hover:border-slate-400/50 hover:text-slate-200 transition-all"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                onClick={handleNextToSports}
                disabled={!name.trim() || !acceptedTerms}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white border-0 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-base text-gray-200">Select Sports You Play</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {availableSports.map(sport => (
                  <Button
                    key={sport}
                    type="button"
                    variant={selectedSports.includes(sport) ? "default" : "outline"}
                    className={selectedSports.includes(sport) 
                      ? "justify-start bg-white/20 text-white hover:bg-white/30 border-white/20" 
                      : "justify-start bg-white/5 text-gray-200 hover:bg-white/10 border border-white/20 hover:border-white/30"
                    }
                    onClick={() => toggleSportSelection(sport)}
                  >
                    {selectedSports.includes(sport) && (
                      <Check className="mr-2 h-4 w-4" />
                    )}
                    {sport}
                  </Button>
                ))}
              </div>
            </div>
            
            {selectedSports.length > 0 && (
              <div>
                <Label className="text-base text-gray-200">Your Skill Levels</Label>
                <div className="space-y-2 mt-2">
                  {selectedSports.map(sport => (
                    <div key={sport} className="flex items-center space-x-2">
                      <div className="w-1/3 text-gray-200">{sport}:</div>
                      <div className="w-2/3">
                        <select
                          className="w-full h-10 rounded-xl border border-white/20 bg-white/5 px-3 py-1 text-white backdrop-blur-sm focus:border-white/40 focus:ring-white/20"
                          value={skillLevels[sport] || 'Beginner'}
                          onChange={(e) => setSkillLevel(sport, e.target.value)}
                        >
                          {skillOptions.map(level => (
                            <option key={level} value={level} className="bg-gray-800 text-white">{level}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex space-x-2 pt-4">
              <Button 
                variant="ghost" 
                onClick={() => setStep(2)}
                className="flex-1 text-gray-200 hover:bg-slate-600/20 border border-slate-500/30 hover:border-slate-400/50 hover:text-slate-200 transition-all"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button 
                onClick={handleCompleteRegistration}
                disabled={selectedSports.length === 0}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white border-0 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Complete Registration
                <Check className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ backgroundColor: '#1E2539' }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full opacity-20 bg-white"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400), 
              y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50 
            }}
            animate={{ 
              y: -50,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
              transition: { 
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                ease: "linear",
                delay: Math.random() * 2
              }
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="backdrop-blur-xl bg-white/5 border border-white/10 text-white shadow-2xl">
          <CardHeader className="space-y-1">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <img src="/lovable-uploads/cba4a2dc-5021-4756-98a0-b154222d7523.png" alt="Khelmanch Logo" className="h-8" />
            </motion.div>
            <CardTitle className="text-2xl text-center text-white">Create an Account</CardTitle>
            <CardDescription className="text-center text-gray-200">
              {step === 1 ? "Contact Information" : step === 2 ? "Personal Details" : "Sports Preferences"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
