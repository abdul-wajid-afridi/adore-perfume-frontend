import { memo } from "react";
import SideBarItem, { TSideBarItemProps } from "./side-bar-item";

type TSideBarRoutesProps = {
  routes: TSideBarItemProps[];
};
const SideBarRoutes = memo(function SideBarRoutes(props: TSideBarRoutesProps) {
  return (
    <div className="flex w-full flex-col">
      {props.routes?.map((route) => {
        return (
          <SideBarItem
            key={route.path}
            path={route.path}
            icon={route.icon}
            label={route.label}
          />
        );
      })}
    </div>
  );
});

export default SideBarRoutes;
