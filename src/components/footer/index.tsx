import { memo } from "react";
import { companyData } from "../../constants/data";
import { Link } from "react-router-dom";

const Footer = memo(function Footer() {
  return (
    <footer className="bg-black py-10 sm:p-5 sm:h-[350px] text-white flex flex-col gap-10 justify-evenly items-center ">
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-2 md:gap-3">
        <div className="flex flex-col px-3 gap-3">
          <h4 className="hover:text-indigo-500 cursor-pointer border-b-2 border-indigo-500 w-fit">
            {companyData.name}
          </h4>
          <p>{companyData.description}</p>

          <Link
            className="border-b-2 w-fit hover:text-primary"
            to="/privacy-policy"
          >
            Privacy Policy
          </Link>
          <Link
            className="border-b-2 w-fit hover:text-primary"
            to="/terms-and-conditions"
          >
            Terms And Conditions
          </Link>
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
        Copyright @ 2024 Adore Perfum - All Rights Reserved
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
        className="bg-black text-white p-1 rounded-full hover:text-blue-400"
      >
        {companyData.facebook.icon}
      </a>
      <a
        href={companyData.instagram.link}
        target="_blank"
        className="bg-black text-white p-1 rounded-full hover:text-pink-400"
      >
        {companyData.instagram.icon}
      </a>
      <a
        href={companyData.tiktok.link}
        target="_blank"
        className="bg-black p-[2px] rounded-full"
      >
        {companyData.tiktok.icon}
      </a>
      {/* <Pintrist /> */}
      {/* <Google /> */}
    </div>
  );
});
export default Footer;
