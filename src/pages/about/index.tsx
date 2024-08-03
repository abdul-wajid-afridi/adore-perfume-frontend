import { memo } from "react";
import { companyData } from "../../constants/data";
import PageBanner from "../../components/banner";

const AboutPage = memo(function AboutPage() {
  return (
    <div className="flex flex-col gap-10 sm:gap-20">
      <PageBanner bannerImages="/banner/car.jpg" title="About us" />
      {/* <div className="bg-[url('/images/bg-about.jpg')] bg-cover bg-center aspect-video flex items-center bg-black/50 bg-blend-overlay">
  
        <div className="ml-4 sm:ml-10 w-[90%] lg:w-[50%] text-white">
          <h3 className="text-secondary border-b w-fit mb-5">our story</h3>
          <p>
            Adore-Perfume was established in 2018 by our founder Mr. Junaid khan
            . We are one of the leading manufacturers and suppliers of perfume
            products, with a special focus on the non-alcoholic perfume
            category.
          </p>
        </div>
      </div> */}

      <div className="flex flex-wrap md:flex-nowrap gap-10 px-5 sm:px-10 mb-10 sm:mb-14">
        <div className="flex">
          <img src="/home-slider/spray3.jpg" alt="about pic" />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-primary ">About us</h3>
          <p>
            Adore Perfume, we maintain exceptional quality by sourcing raw
            materials from internationally renowned suppliers known for their
            high quality and standards. Our motto, "Quality First," reflects our
            unwavering commitment to excellence, ensuring that every product we
            deliver meets the highest benchmarks. Customer satisfaction is at
            the heart of our operations, driving us to consistently exceed
            expectations.
          </p>
          <p>
            At Adore perfume, we believe that the growth of our company is
            intrinsically linked to the growth of our people, fostering a
            culture of continuous improvement and mutual success.
          </p>
        </div>
      </div>
      {/* given random */}
      <div className="ml-5 sm:ml-10 mb-10 sm:mb-14">
        <h3 className="text-center border-b text-primary">Our Stores</h3>
        <li>Our store is located </li>
        <li>{companyData.address}</li>
        <li>{companyData.phone}</li>
      </div>
    </div>
  );
});

export default AboutPage;
