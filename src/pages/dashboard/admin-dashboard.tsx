import { memo } from "react";
import Navbar from "./_components/Navbar";
import SideBar from "./_components/side-bar";
import { Outlet } from "react-router-dom";
const AdminDashboard = memo(function AdminDashboard() {
  return (
    <section className="h-full">
      <div className="h-[90px] md:ml-[250px] w-full z-50 fixed inset-y-0">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full inset-y-0 fixed z-50 flex-col w-[250px]">
        <SideBar />
      </div>
      {/* given ml for md so that can push the content on md to right side */}
      <main className="h-full md:ml-[250px] mt-[90px] mx-2 sm:mx-5">
        <Outlet />
      </main>
    </section>
  );
});

export default AdminDashboard;
