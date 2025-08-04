import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TermsConditions() {
  return (
    <MobileLayout isLoggedIn={true}>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold text-center">Terms & Conditions</h1>
        
        <Card className="p-6">
          <CardContent className="p-0">
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-bold mb-2">Welcome to Khel Manch!</h2>
                  <p className="text-sm leading-relaxed">
                    These terms and conditions outline the rules and regulations for the use of KM Sports's Website, located at www.khelmanch.com.
                  </p>
                </div>

                <div>
                  <p className="text-sm leading-relaxed">
                    By accessing this website we assume you accept these terms and conditions. Do not continue to use Khel Manch if you do not agree to take all of the terms and conditions stated on this page.
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-bold mb-2">Cookies</h2>
                  <p className="text-sm leading-relaxed">
                    We employ the use of cookies. By accessing Khel Manch, you agreed to use cookies in agreement with the KM Sports's Privacy Policy. Most interactive websites use cookies to let us retrieve the user's details for each visit.
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-bold mb-2">License</h2>
                  <p className="text-sm leading-relaxed mb-2">
                    Unless otherwise stated, KM Sports and/or its licensors own the intellectual property rights for all material on Khel Manch. All intellectual property rights are reserved.
                  </p>
                  <p className="text-sm leading-relaxed mb-2">You must not:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Republish material from Khel Manch</li>
                    <li>Sell, rent or sub-license material from Khel Manch</li>
                    <li>Reproduce, duplicate or copy material from Khel Manch</li>
                    <li>Redistribute content from Khel Manch</li>
                    <li>Reproduce, duplicate or copy services from Khel Manch</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-bold mb-2">User Comments</h2>
                  <p className="text-sm leading-relaxed">
                    Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. KM Sports does not filter, edit, publish or review Comments prior to their presence on the website.
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-bold mb-2">Hyperlinking to our Content</h2>
                  <p className="text-sm leading-relaxed mb-2">The following organizations may link to our Website without prior written approval:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Government agencies</li>
                    <li>Search engines</li>
                    <li>News organizations</li>
                    <li>Online directory distributors</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-bold mb-2">Content Liability</h2>
                  <p className="text-sm leading-relaxed">
                    We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website.
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-bold mb-2">Reservation of Rights</h2>
                  <p className="text-sm leading-relaxed">
                    We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request.
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-bold mb-2">Disclaimer</h2>
                  <p className="text-sm leading-relaxed">
                    To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will limit or exclude our or your liability for death or personal injury, fraud or fraudulent misrepresentation.
                  </p>
                </div>

                <div>
                  <p className="text-sm leading-relaxed">
                    As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
                  </p>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
}