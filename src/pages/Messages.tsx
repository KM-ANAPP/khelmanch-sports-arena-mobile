
import { MobileLayout } from "@/components/layouts/mobile-layout";
import MessageCenter from "@/components/communication/MessageCenter";

export default function Messages() {
  return (
    <MobileLayout isLoggedIn={true}>
      <div className="p-4 h-full">
        <MessageCenter />
      </div>
    </MobileLayout>
  );
}
