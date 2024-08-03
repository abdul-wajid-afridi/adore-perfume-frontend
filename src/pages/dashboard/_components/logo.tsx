import { memo } from "react";

const Logo = memo(function Logo() {
  return <img height={120} width={120} alt="logo" src={"/adore-logo.png"} />;
});

export default Logo;
