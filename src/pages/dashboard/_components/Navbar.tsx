import { memo } from "react";
import MobileSideBar from "./mobile-side-bar";
import Logo from "./logo";

const Navbar = memo(function Navbar() {
  return (
    <section className="flex items-center justify-between p-4 shadow-md border-b h-full bg-secondary">
      <MobileSideBar />
      <Logo />
    </section>
  );
});

export default Navbar;
