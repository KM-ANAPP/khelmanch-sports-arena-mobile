import { MobileLayout } from "@/components/layouts/mobile-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "How do I register for a tournament?",
      answer: "You can register for tournaments by browsing our tournament section, selecting your preferred tournament, and clicking the 'Register Team' button. Make sure to complete the registration before the deadline."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major payment methods including credit/debit cards, UPI, net banking, and digital wallets. All transactions are secure and encrypted."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, you can cancel your booking up to 24 hours before the scheduled time. Cancellation fees may apply based on our refund policy."
    },
    {
      question: "How do I find venues near me?",
      answer: "Use our location selector in the header to choose your city. The app will show you all available venues and tournaments in your selected location."
    },
    {
      question: "What if it rains on the tournament day?",
      answer: "For outdoor tournaments, we have a rain policy. If the weather doesn't permit play, the tournament will be rescheduled and all participants will be notified via the app."
    },
    {
      question: "How do I earn Khelmanch coins?",
      answer: "You can earn Khelmanch coins by participating in tournaments, referring friends, and completing various activities on the platform. These coins can be used for discounts on future bookings."
    },
    {
      question: "Is there an age limit for tournaments?",
      answer: "Age limits vary by tournament. Each tournament listing includes specific eligibility criteria including age requirements. Please check the tournament details before registering."
    },
    {
      question: "How do I contact support?",
      answer: "You can contact our support team through the 'Contact Us' section in the app, or reach out to us via email or phone. Our support hours are 9 AM to 9 PM, Monday to Sunday."
    }
  ];

  return (
    <MobileLayout isLoggedIn={true}>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </MobileLayout>
  );
}