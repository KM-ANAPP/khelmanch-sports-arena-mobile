
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const ContactSection = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you soon.",
    });
  };

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <p className="text-muted-foreground mb-6">
        At Khelmanch, we value your feedback and inquiries.
        Please feel free to reach out through our contact form, email, or phone. 
        Our team is here to help you and make sure you have a smooth experience.
        We strive to respond promptly to your needs!
      </p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="text-muted-foreground" />
            <span>support@khelmanch.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="text-muted-foreground" />
            <span>+91 1234567890</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input placeholder="Your Name" required />
          <Input type="email" placeholder="Your Email" required />
          <Textarea placeholder="Your Message" className="min-h-[100px]" required />
          <Button type="submit">Send Message</Button>
        </form>
      </div>
    </section>
  );
};
