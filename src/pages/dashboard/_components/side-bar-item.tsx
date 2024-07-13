import { memo, useCallback } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../../lib/utils";
import { useLocation, useNavigate } from "react-router-dom";

export type TSideBarItemProps = {
  icon: LucideIcon;
  label: string;
  path: string;
};

const SideBarItem = memo(function SideBarItem(props: TSideBarItemProps) {
  const Icon = props.icon;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isActive =
    (pathname === "/dashboard" && props.path === "/dashboard") ||
    pathname === props.path ||
    pathname.startsWith(`${props.path}/dashboard`);

  const pushActiveRoute = useCallback(
    function pushActiveRoute() {
      navigate(props.path);
    },
    [props.path, navigate]
  );

  return (
    <button
      type="button"
      onClick={pushActiveRoute}
      className={cn(
        "flex items-center gap-x-2 pl-5 text-primary hover:text-slate-600 hover:bg-slate-300/20 text-sm transition-all ease-linear",
        isActive &&
          "text-sky-700 bg-sky-200 hover:text-sky-700 hover:bg-sky-200"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={20}
          className={cn(isActive && "text-primary", isActive && "text-sky-700")}
        />
        {props.label}
      </div>
      <div
        className={cn(
          "ml-auto border-2 border-slate-700 opacity-0 h-full transition-all ease-linear",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
});

export default SideBarItem;
