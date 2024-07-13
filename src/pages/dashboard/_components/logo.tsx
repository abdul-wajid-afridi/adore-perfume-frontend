import { memo } from "react";

const Logo = memo(function Logo() {
  return <img height={120} width={120} alt="logo" src={"/next.svg"} />;
});

export default Logo;
