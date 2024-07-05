import { Facebook, Instagram, Linkedin } from "lucide-react";
import { memo } from "react";

const Footer = memo(function Footer() {
  return (
    <footer className="bg-black py-10 sm:p-5 sm:h-[350px] text-white flex flex-col gap-10 justify-evenly items-center ">
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-2 md:gap-3">
        <div className="flex flex-col px-3 gap-3">
          <h4 className="hover:text-indigo-500 cursor-pointer border-b-2 border-indigo-500 w-fit">
            Adore Perfume
          </h4>
          <p>
            Elegance in every drop. Luxury scents, timeless allure. Crafted for
            lasting impressions.
          </p>
        </div>
        <div className="flex flex-col px-3 gap-3">
          <h4 className="hover:text-indigo-500 cursor-pointer border-b-2 border-indigo-500 w-fit">
            Customer Services
          </h4>
          <div>
            <p>Phone: 123456789</p>
            <p>Email: abc"gmail.com</p>
            <p>Address: UAE</p>
          </div>
        </div>
        <div className="flex flex-col px-3 gap-3">
          <h4 className="hover:text-indigo-500 cursor-pointer border-b-2 border-indigo-500 w-fit">
            Adore Perfume
          </h4>
          <p>Follow us on</p>
          <div className="flex gap-2">
            <a
              href="https://www.facebook.com"
              target="_blank"
              className="hover:text-blue-400"
            >
              <Facebook />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              className="hover:text-pink-400"
            >
              <Instagram />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              className="hover:text-blue-300"
            >
              <Linkedin />
            </a>
            {/* <Pintrist /> */}
            {/* <Google /> */}
          </div>
        </div>
      </section>
      <p className="border-b-2 border-indigo-500">
        All right reserved © Adore Perfume. Dubai – London
      </p>
    </footer>
  );
});

export default Footer;
