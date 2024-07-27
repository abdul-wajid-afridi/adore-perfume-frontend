import { memo } from "react";
import Navbar from "./_components/Navbar";
import SideBar from "./_components/side-bar";
import { Outlet, useLocation } from "react-router-dom";
import { API_URL } from "../../redux/urlConfig";
import toast from "react-hot-toast";
import { axiosError } from "../../lib/axios-error";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/loader";
const AdminDashboard = memo(function AdminDashboard() {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
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
        {isDashboard && <Dashboard />}
        <Outlet />
      </main>
    </section>
  );
});

type TCountType = {
  productCount: number;
  brandCount: number;
  userCount: number;
  categoryCount: number;
  contactCount: number;
  tasteCount: number;
  orderCount: number;
  reviewsCount: number;
};
const Dashboard = memo(function Dashboard() {
  const useGetAllCounts = () =>
    useQuery({
      queryKey: ["fetch-all-counts"],
      queryFn: asyncGetAllCounts,
    });

  const asyncGetAllCounts = async () => {
    try {
      const response = await API_URL.get<TCountType>(`/api/v1/get-counts`);

      const data = await response.data;

      return data;
    } catch (error) {
      throw toast.error(axiosError(error));
    }
  };
  const { data, isLoading } = useGetAllCounts();

  if (isLoading) {
    return (
      <div className="h-screen grid place-items-center">
        <Loader size="big" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="my-10">Over Review</h2>

      <div className="flex justify-between flex-wrap gap-4 px-5">
        <div className="flex p-2 hover:shadow-md shadow rounded-sm flex-col border-t border-t-primary">
          <p>total brands</p>
          <h2>{data?.brandCount}</h2>
        </div>
        <div className="flex p-2 hover:shadow-md shadow rounded-sm flex-col border-t border-t-primary">
          <p>total category</p>
          <h2>{data?.categoryCount}</h2>
        </div>

        <div className="flex p-2 hover:shadow-md shadow rounded-sm flex-col border-t border-t-primary">
          <p>total contacts</p>
          <h2>{data?.contactCount}</h2>
        </div>

        <div className="flex p-2 hover:shadow-md shadow rounded-sm flex-col border-t border-t-primary">
          <p>total orders</p>
          <h2>{data?.orderCount}</h2>
        </div>

        <div className="flex p-2 hover:shadow-md shadow rounded-sm flex-col border-t border-t-primary">
          <p>total product</p>
          <h2>{data?.productCount}</h2>
        </div>

        <div className="flex p-2 hover:shadow-md shadow rounded-sm flex-col border-t border-t-primary">
          <p>total scents</p>
          <h2>{data?.tasteCount}</h2>
        </div>

        <div className="flex p-2 hover:shadow-md shadow rounded-sm flex-col border-t border-t-primary">
          <p>total users/admins</p>
          <h2>{data?.userCount}</h2>
        </div>

        <div className="flex p-2 hover:shadow-md shadow rounded-sm flex-col border-t border-t-primary">
          <p>total reviews</p>
          <h2>{data?.reviewsCount}</h2>
        </div>
      </div>
    </div>
  );
});

export default AdminDashboard;
