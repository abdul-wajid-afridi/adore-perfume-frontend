import { memo } from "react";

const WhatsAppButton = memo(function WhatsApp() {
  //   add random number for now
  const number = "03122435456";
  const phoneNumber = number?.slice(1, 20);
  const redirectToWhatsApp = () => {
    const message = "Added random number for now!";

    const whatsappUrl = `https://wa.me/+92${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.location.href = whatsappUrl;
  };
  return (
    <div
      className="fixed bottom-20 z-[99] cursor-pointer right-5 animate-pulse"
      onClick={redirectToWhatsApp}
    >
      <img src="/svgs/whatsap.svg" className="h-8 w-8 rounded-full ml-2" />
    </div>
  );
});
export default WhatsAppButton;
