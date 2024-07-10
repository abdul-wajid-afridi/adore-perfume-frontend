import { memo } from "react";
import { motion } from "framer-motion";

const tabs = [
  { id: "login", label: "Login" },
  { id: "signup", label: "Signup" },
];

interface TabsProps {
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const Tabs = memo(function Tabs(props: TabsProps) {
  return (
    <div className="flex justify-between rounded-full border-2 w-full sm:w-[400px] text-primary bg-secondary mx-5">
      {tabs.map((tab) => (
        <div key={tab.id} className="relative w-[300px] text-center ">
          <button
            className="z-50 overflow-hidden h-10 w-full"
            onClick={() => props.onTabClick(tab.id)}
          >
            {tab.label}
          </button>
          {props.activeTab === tab.id && (
            <motion.div
              layoutId="underline"
              className="absolute grid place-items-center top-0 z-10 h-10 w-full rounded-full bg-primary text-secondary"
              initial={false}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {tab.label}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
});

export default Tabs;
