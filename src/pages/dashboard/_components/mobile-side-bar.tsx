import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "../../../components/ui/sheet";
import { Menu } from "lucide-react";

import { memo } from "react";
import SideBarRoutes from "./side-bar-routes";
import { DASHBOARD_ROUTES } from "../../../constants/routes";

const MobileSideBar = memo(function MobileSideBar() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden hover:opacity-50 transition-all ease-linear">
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="h-full">
          <SideBarRoutes routes={DASHBOARD_ROUTES} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
});

export default MobileSideBar;
