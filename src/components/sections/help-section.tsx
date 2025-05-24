
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const HelpSection = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+919876543210"; // Replace with your WhatsApp number
    const message = "Hi! I need help with Khelmanch app.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+919876543210";
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:support@khelmanch.com?subject=Support Request&body=Hi, I need help with...";
  };

  const helpOptions = [
    {
      icon: MessageCircle,
      title: "WhatsApp Support",
      description: "Get instant help on WhatsApp",
      color: "from-green-400 to-green-600",
      action: handleWhatsAppClick
    },
    {
      icon: Phone,
      title: "Call Support",
      description: "Speak directly with our team",
      color: "from-blue-400 to-blue-600",
      action: handlePhoneClick
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your queries",
      color: "from-purple-400 to-purple-600",
      action: handleEmailClick
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 mb-8"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Still Need Help?</h2>
        <p className="text-muted-foreground">Our support team is here to assist you 24/7</p>
      </div>
      
      <div className="grid gap-4">
        {helpOptions.map((option, index) => (
          <motion.div
            key={option.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 group border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
              onClick={option.action}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  {/* Icon */}
                  <motion.div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${option.color} flex items-center justify-center text-white shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <option.icon className="h-6 w-6" />
                  </motion.div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                      {option.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {option.description}
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <motion.div
                    className="text-muted-foreground group-hover:text-primary"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* FAQ Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center mt-6"
      >
        <Button variant="outline" className="px-8 py-2 rounded-full">
          View FAQ
        </Button>
      </motion.div>
    </motion.section>
  );
};
