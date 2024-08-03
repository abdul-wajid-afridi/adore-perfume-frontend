import { memo } from "react";

type TPageBannerProps = {
  bannerImages: string;
  title: string;
};
const PageBanner = memo(function PageBanner(props: TPageBannerProps) {
  return (
    <div
      style={{
        backgroundImage: `url(${props.bannerImages})`,
      }}
      className={`mb-10 flex items-center justify-center bg-[url('${props.bannerImages}')] bg-cover h-[50vh] bg-center p-5 aspect-video bg-black/50 bg-blend-overlay`}
    >
      <h2 className="text-white">{props.title}</h2>
    </div>
  );
});

export default PageBanner;
