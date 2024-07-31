import { memo } from "react";
import { companyData } from "../../constants/data";

const Footer = memo(function Footer() {
  return (
    <footer className="bg-black py-10 sm:p-5 sm:h-[350px] text-white flex flex-col gap-10 justify-evenly items-center ">
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-2 md:gap-3">
        <div className="flex flex-col px-3 gap-3">
          <h4 className="hover:text-indigo-500 cursor-pointer border-b-2 border-indigo-500 w-fit">
            {companyData.name}
          </h4>
          <p>{companyData.description}</p>
        </div>
        <div className="flex flex-col px-3 gap-3">
          <h4 className="hover:text-indigo-500 cursor-pointer border-b-2 border-indigo-500 w-fit">
            Customer Services
          </h4>
          <div>
            <p>Phone: {companyData.phone}</p>
            <p>Email: {companyData.email}</p>
            <p>Address: {companyData.address}</p>
          </div>
        </div>
        <div className="flex flex-col px-3 gap-3">
          <h4 className="hover:text-indigo-500 cursor-pointer border-b-2 border-indigo-500 w-fit">
            {companyData.name}
          </h4>
          <p>Follow us on</p>
          <SocialMediaIcons />
        </div>
      </section>
      <p className="border-b-2 border-indigo-500">
        All right reserved © Adore Perfume. Dubai – London
      </p>
    </footer>
  );
});

export const SocialMediaIcons = memo(function SocialMediaIcons() {
  return (
    <div className="flex gap-2">
      <a
        href={companyData.facebook.link}
        target="_blank"
        className="hover:text-blue-400"
      >
        {companyData.facebook.icon}
      </a>
      <a
        href={companyData.instagram.link}
        target="_blank"
        className="hover:text-pink-400"
      >
        {companyData.instagram.icon}
      </a>
      <a
        href={companyData.tiktok.link}
        target="_blank"
        className="hover:text-blue-300"
      >
        {companyData.tiktok.icon}
      </a>
      {/* <Pintrist /> */}
      {/* <Google /> */}
    </div>
  );
});
export default Footer;
