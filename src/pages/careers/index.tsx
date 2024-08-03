import { memo } from "react";
import { companyData } from "../../constants/data";
import PageBanner from "../../components/banner";

const CareersPage = memo(function CareersPage() {
  return (
    <div className="flex flex-col items-center">
      <PageBanner bannerImages="/banner/men.jpg" title="Careers" />

      <div className="flex flex-col gap-4 shadow-lg p-[40px] border rounded-md sm:w-[80vw] mt-10  mb-20">
        <h3 className="text-primary ">
          Join Adore Team – Your Career with an Upscale Perfume Brand
        </h3>
        <p>
          Adore is a renowned perfume brand in UAE that offers an unparalleled
          experience to its customers through high-quality fragrances and
          innovative products. We offer more than just the best perfumes – we
          offer a challenging and rewarding career path for those looking to
          make their mark in the luxury scent industry. At Adore, you will find
          opportunities to grow professionally while working with some of the
          world’s top fragrance designers and specialists in this field. Our
          team thrives on innovation and creative problem-solving – making your
          workdays both enjoyable and stimulating. In addition to offering
          competitive salaries, we also provide generous benefits, including:
        </p>

        {/* given random */}
        <div className="space-y-3 my-5">
          <li>Our store is located </li>
          <li>{companyData.address}</li>
          <li>{companyData.phone}</li>
        </div>
        <div className="space-y-4">
          <p>
            So, if you are seeking an exciting career with a top perfume brand
            in the UAE, join us at Adore Perfumes!
          </p>
          <p>Send your CV to: careers {companyData.email}</p>
        </div>
      </div>
    </div>
  );
});

export default CareersPage;
