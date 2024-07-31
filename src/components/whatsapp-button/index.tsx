import { memo } from "react";
import { companyData } from "../../constants/data";

const WhatsAppButton = memo(function WhatsApp() {
  //   add random number for now
  // const number = "03122435456";
  const number = companyData.phone;
  const phoneNumber = number?.slice(0, 20);
  const redirectToWhatsApp = () => {
    const message = "Assalamo alykom!";

    // for pakistan numbers
    // const whatsappUrl = `https://wa.me/+92${phoneNumber}?text=${encodeURIComponent(
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.location.href = whatsappUrl;
  };
  return (
    <div
      className="fixed bottom-20 z-[99] cursor-pointer right-5 animate-pulse"
      onClick={redirectToWhatsApp}
    >
      <img src="/svgs/whatsap.svg" className="h-16 w-16 rounded-full ml-2" />
    </div>
  );
});
export default WhatsAppButton;
