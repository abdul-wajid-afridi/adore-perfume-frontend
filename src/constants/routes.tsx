import {
  Contact,
  ListIcon,
  LayoutDashboardIcon,
  ListOrdered,
  Settings,
  Home,
  // Store,
  SprayCan,
  Stars,
  Flower,
  ListCollapse,
  Tv,
  Gift,
} from "lucide-react";

export const ROOT_ROUTES = [
  { label: "Home", path: "/", icon: Home },
  // { label: "Online Store", path: "/online-store", icon: Store },
  { label: "Scent", path: "/scent", icon: SprayCan },
  { label: "Customize", path: "/customize", icon: Settings },
  // { label: "Menu", path: "/menu", icon: ListIcon },
  // { label: "Cart", path: "/cart", icon: ShoppingCart },
];

export const DASHBOARD_ROUTES = [
  { icon: LayoutDashboardIcon, label: "Dashboard", path: "/dashboard" },
  { icon: ListIcon, label: "Products", path: "/dashboard/products" },
  { icon: Gift, label: "Gift Box", path: "/dashboard/gift-box" },
  { icon: ListCollapse, label: "Category", path: "/dashboard/category" },
  { icon: Tv, label: "Brand", path: "/dashboard/brand" },
  { icon: Flower, label: "Scents", path: "/dashboard/taste" },
  { icon: Contact, label: "Contact", path: "/dashboard/contact-us" },
  { icon: Stars, label: "Reviews", path: "/dashboard/reviews" },
  { icon: ListOrdered, label: "Orders", path: "/dashboard/orders" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];
