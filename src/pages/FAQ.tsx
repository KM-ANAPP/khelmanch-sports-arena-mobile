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
      question: "What is Khelmanch?",
      answer: "Khel Manch is a premier sports company dedicated to organizing high-quality sports tournaments. We aim to promote sportsmanship, teamwork, and healthy competition within our community."
    },
    {
      question: "What types of tournaments does Khelmanch organize?",
      answer: "Khel Manch specializes in organizing all Sports tournaments for players of all ages and skill levels. Our tournaments cater to both amateur and professional athletes, providing a platform for friendly competition and personal growth."
    },
    {
      question: "How can I participate in Khelmanch tournaments?",
      answer: "Participation in Khel Manch tournaments is open to individuals and teams. You can register for our tournaments through our website or by contacting our team directly. We welcome players of all skill levels and encourage everyone to join in the excitement."
    },
    {
      question: "Are there any age restrictions for participating in Khelmanch tournaments?",
      answer: "Khel Manch tournaments may have specific age categories, ranging from youth to adult divisions. We design our tournaments to accommodate players of various age groups, ensuring an inclusive and enjoyable experience for everyone."
    },
    {
      question: "Where are Khelmanch tournaments held?",
      answer: "Khel Manch tournaments take place at various locations, including state-of-the-art sports facilities and renowned stadiums. We strive to select venues that offer optimal playing conditions and a memorable experience for participants and spectators alike."
    },
    {
      question: "How does Khelmanch ensure fair play and sportsmanship during tournaments?",
      answer: "Khel Manch prioritizes fair play and sportsmanship in all aspects of our tournaments. We employ experienced referees and officials to enforce the rules impartially and maintain a competitive yet respectful atmosphere on the field. Additionally, we encourage participants to uphold the values of sportsmanship and camaraderie throughout the tournament."
    },
    {
      question: "Can I volunteer or collaborate with Khelmanch for events?",
      answer: "Yes, Khel Manch welcomes volunteers and collaborators who share our passion for sports and community engagement. Whether you're interested in assisting with event logistics, sponsorship opportunities, or other areas, we invite you to reach out to us to explore potential collaborations."
    },
    {
      question: "How can I stay updated on upcoming Khelmanch tournaments and events?",
      answer: "To stay informed about upcoming Khel Manch tournaments and events, you can subscribe to our newsletter through our website. Additionally, you can follow us on social media platforms such as Facebook and Instagram for the latest updates and announcements."
    },
    {
      question: "What safety measures does Khelmanch implement during tournaments?",
      answer: "Khel Manch prioritizes the safety and well-being of all participants and attendees during tournaments. We adhere to strict safety protocols, including medical assistance on-site, adequate security measures, and compliance with local regulations to ensure a secure and enjoyable environment for everyone involved."
    },
    {
      question: "How can I contact Khelmanch for further inquiries?",
      answer: "For any additional inquiries or information about Khel Manch tournaments, sponsorship opportunities, or general questions, you can reach out to our team through the contact form on our website, via email at khelmanch22@gmail.com, or by phone at +91 9870190331. Our dedicated team is here to assist you and provide the support you need."
    },
    {
      question: "What makes Khelmanch tournaments stand out from others?",
      answer: "Khel Manch tournaments are known for their exceptional organization, attention to detail, and commitment to providing a memorable experience for participants. We prioritize creating a vibrant and inclusive atmosphere where players can showcase their skills, form lasting connections, and enjoy the thrill of competition."
    },
    {
      question: "Are there prizes or awards available for tournament winners?",
      answer: "Yes, Khel Manch tournaments often feature prizes and awards for outstanding performance. These may include trophies, medals, cash prizes, or sponsored gifts from our partners. We believe in recognizing and celebrating the achievements of participants who excel in our tournaments."
    },
    {
      question: "Can spectators attend Khelmanch tournaments?",
      answer: "Absolutely! Khel Manch tournaments welcome spectators and fans to cheer on their favorite teams and players. We encourage friends, family members, and sports enthusiasts to join us at our events and experience the excitement firsthand."
    },
    {
      question: "Are there opportunities for sponsorship or partnerships with Khelmanch?",
      answer: "Yes, Khel Manch offers various sponsorship and partnership opportunities for businesses, brands, and organizations interested in aligning with our values and reaching our diverse audience. Whether through event sponsorship, branding opportunities, or collaborative marketing campaigns, we welcome partnerships that support our mission and enhance the tournament experience for participants and attendees."
    }
  ];

  return (
    <MobileLayout isLoggedIn={true}>
      <div className="p-4 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">FAQ</h1>
          <p className="text-muted-foreground">Frequently Asked Questions</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </MobileLayout>
  );
}