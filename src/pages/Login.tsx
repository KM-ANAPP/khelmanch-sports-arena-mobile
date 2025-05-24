
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { BiometricLoginButton } from "@/components/auth/BiometricLoginButton";
import { GoogleLoginButton } from "@/components/auth/GoogleLoginButton";
import { PhoneLoginTab } from "@/components/auth/PhoneLoginTab";

export default function Login() {
  const navigate = useNavigate();

  const handleSkipLogin = () => {
    toast({
      title: "Guest Mode",
      description: "You are browsing as a guest. Some features may be limited.",
    });
    navigate("/home");
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
            <CardTitle className="text-2xl text-center text-white">Welcome to Khelmanch</CardTitle>
            <CardDescription className="text-center text-gray-200">
              Login to access all features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <BiometricLoginButton />
            </motion.div>
            
            <Tabs defaultValue="phone" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/5 border border-white/10">
                <TabsTrigger 
                  value="phone" 
                  className="text-gray-200 data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all hover:bg-blue-700/20"
                >
                  Phone
                </TabsTrigger>
                <TabsTrigger 
                  value="google" 
                  className="text-gray-200 data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all hover:bg-green-700/20"
                >
                  Google
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="phone">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <PhoneLoginTab />
                </motion.div>
              </TabsContent>
              
              <TabsContent value="google">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <GoogleLoginButton />
                </motion.div>
              </TabsContent>
            </Tabs>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-sm"
            >
              <span className="text-gray-200">Don't have an account?</span>{" "}
              <Link to="/register" className="text-emerald-400 font-medium hover:text-emerald-300 hover:underline transition-colors">
                Register now
              </Link>
            </motion.div>
          </CardContent>
          <CardFooter>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="w-full"
            >
              <Button 
                variant="ghost" 
                className="w-full text-gray-200 hover:bg-purple-600/20 border border-purple-500/30 hover:border-purple-400/50 hover:text-purple-200 transition-all"
                onClick={handleSkipLogin}
              >
                Skip Login for Now
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
      
      <div id="recaptcha-container" className="invisible"></div>
    </div>
  );
}
