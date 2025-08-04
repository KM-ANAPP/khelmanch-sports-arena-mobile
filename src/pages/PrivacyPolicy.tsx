import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PrivacyPolicy() {
  return (
    <MobileLayout isLoggedIn={true}>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold text-center">Privacy Policy</h1>
        
        <Card className="p-6">
          <CardContent className="p-0">
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Last updated: May 27, 2024</p>
                
                <div>
                  <p className="text-sm leading-relaxed">
                    This Privacy Policy describes our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells you about your privacy rights and how the law protects You.
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-bold mb-2">Definitions</h2>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li><strong>Account:</strong> means a unique account created for You to access our service</li>
                    <li><strong>Company:</strong> refers to Khel manch</li>
                    <li><strong>Country:</strong> refers to Delhi, India</li>
                    <li><strong>Personal Data:</strong> is any information that relates to an identified or identifiable individual</li>
                    <li><strong>Website:</strong> refers to Khel manch, accessible from www.khelmanch.com</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-bold mb-2">Types of Data Collected</h2>
                  <h3 className="font-semibold mb-1">Personal Data</h3>
                  <p className="text-sm leading-relaxed mb-2">
                    While using Our service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify you:
                  </p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Email address</li>
                    <li>First name and last name</li>
                    <li>Phone number</li>
                    <li>Usage Data</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-bold mb-2">Use of Your Personal Data</h2>
                  <p className="text-sm leading-relaxed mb-2">The Company may use Personal Data for the following purposes:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>To provide and maintain our Service</li>
                    <li>To manage Your Account</li>
                    <li>For the performance of a contract</li>
                    <li>To contact You</li>
                    <li>To provide You with news, special offers and general information</li>
                    <li>To manage Your requests</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-bold mb-2">Tracking Technologies and Cookies</h2>
                  <p className="text-sm leading-relaxed">
                    We use cookies and similar tracking technologies to track the activity on our service and store certain information. We use both Session and Persistent Cookies for various purposes including necessary/essential cookies, functionality cookies, and cookies policy acceptance cookies.
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-bold mb-2">Retention of Your Personal Data</h2>
                  <p className="text-sm leading-relaxed">
                    The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-bold mb-2">Security of Your Personal Data</h2>
                  <p className="text-sm leading-relaxed">
                    The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-bold mb-2">Children's Privacy</h2>
                  <p className="text-sm leading-relaxed">
                    Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13.
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-bold mb-2">Contact Us</h2>
                  <p className="text-sm leading-relaxed">
                    If you have any questions about this Privacy Policy, You can contact us at: <strong>support@khelmanch.com</strong>
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