import { ArrowLeftRight, Instagram, Lock, MapPin } from "lucide-react";
import { memo } from "react";

const FooterSection = memo(function FooterSection() {
  const footerSectionData = [
    {
      id: 1,
      icon: MapPin,
      title: "Free Fast Shipping",
      subTitle: "On all orders above AED500",
    },
    {
      id: 1,
      icon: ArrowLeftRight,
      title: "Fine Fragrances Compounded by hand, on-demand",
      subTitle: "Top Quality",
    },
    {
      id: 1,
      icon: Instagram,
      title: "Visit us on Instagram",
      subTitle: "@adore-parfum",
    },
    {
      id: 1,
      icon: Lock,
      title: "100% Secure Checkout",
      subTitle: "Credit Cards - Apple Pay - Google Pay",
    },
  ];
  return (
    <div className="flex flex-col lg:flex-row justify-evenly lg:items-center mb-10 gap-10 p-5 lg:p-0 lg:gap-2 lg:h-[140px]">
      {footerSectionData.map((it) => {
        return (
          <div className="flex ">
            <div>
              {<it.icon className="shadow-xl h-10 w-10 rounded-full p-1" />}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm">{it.title}</p>
              <p className="text-slate-500 text-sm">{it.subTitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default FooterSection;
