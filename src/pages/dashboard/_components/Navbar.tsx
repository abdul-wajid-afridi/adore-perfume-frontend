import { memo } from "react";
import MobileSideBar from "./mobile-side-bar";

const Navbar = memo(function Navbar() {
  return (
    <section className="flex items-center p-4 shadow-md border-b h-full">
      <MobileSideBar />
    </section>
  );
});

export default Navbar;
