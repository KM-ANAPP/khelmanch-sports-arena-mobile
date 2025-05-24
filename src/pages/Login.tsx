
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
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="space-y-1">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <img src="/lovable-uploads/cba4a2dc-5021-4756-98a0-b154222d7523.png" alt="Khelmanch Logo" className="h-8" />
            </motion.div>
            <CardTitle className="text-2xl text-center">Welcome to Khelmanch</CardTitle>
            <CardDescription className="text-center">
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
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="phone">Phone</TabsTrigger>
                <TabsTrigger value="google">Google</TabsTrigger>
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
              <span className="text-muted-foreground">Don't have an account?</span>{" "}
              <Link to="/register" className="text-primary font-medium">Register now</Link>
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
                className="w-full"
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
