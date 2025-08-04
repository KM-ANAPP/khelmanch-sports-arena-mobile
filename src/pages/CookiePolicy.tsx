import { MobileLayout } from "@/components/layouts/mobile-layout";
import { Card, CardContent } from "@/components/ui/card";

export default function CookiePolicy() {
  return (
    <MobileLayout isLoggedIn={true}>
      <div className="p-4 space-y-6">
        <h1 className="text-2xl font-bold text-center">Cookie Policy</h1>
        
        <Card className="p-6">
          <CardContent className="p-0 space-y-4">
            <div>
              <h2 className="text-lg font-bold mb-2">What Are Cookies</h2>
              <p className="text-sm leading-relaxed">
                As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">How We Use Cookies</h2>
              <p className="text-sm leading-relaxed">
                We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">Disabling Cookies</h2>
              <p className="text-sm leading-relaxed">
                You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">The Cookies We Set</h2>
              <ul className="text-sm space-y-2 list-disc list-inside">
                <li><strong>Account related cookies:</strong> If you create an account with us then we will use cookies for the management of the signup process and general administration.</li>
                <li><strong>Login related cookies:</strong> We use cookies when you are logged in so that we can remember this fact.</li>
                <li><strong>Email newsletters related cookies:</strong> This site offers newsletter or email subscription services and cookies may be used to remember if you are already registered.</li>
                <li><strong>Orders processing related cookies:</strong> This site offers e-commerce or payment facilities and some cookies are essential to ensure that your order is remembered between pages.</li>
                <li><strong>Site preferences cookies:</strong> In order to provide you with a great experience on this site we provide the functionality to set your preferences.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">Third Party Cookies</h2>
              <p className="text-sm leading-relaxed">
                In some special cases we also use cookies provided by trusted third parties. We use Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-2">More Information</h2>
              <p className="text-sm leading-relaxed">
                Hopefully that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.
              </p>
              <p className="text-sm leading-relaxed mt-2">
                However if you are still looking for more information then you can contact us at: <strong>contact@khelmanch.com</strong>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
}