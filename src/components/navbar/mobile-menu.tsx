import {
  Dispatch,
  ForwardRefExoticComponent,
  RefAttributes,
  SetStateAction,
  memo,
  useCallback,
  useMemo,
  useState,
} from "react";
import { MotionConfig, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ROOT_ROUTES } from "../../constants/routes";
import { LucideProps } from "lucide-react";

const MobileMenu = memo(function MobileMenu() {
  const VARIANTS = useMemo(function RotationVariants() {
    return {
      top: {
        open: {
          rotate: ["0deg", "0deg", "45deg"],
          top: ["35%", "50%", "50%"],
        },
        closed: {
          rotate: ["45deg", "0deg", "0deg"],
          top: ["50%", "50%", "35%"],
        },
      },
      middle: {
        open: {
          rotate: ["0deg", "0deg", "-45deg"],
        },
        closed: {
          rotate: ["-45deg", "0deg", "0deg"],
        },
      },
      bottom: {
        open: {
          rotate: ["0deg", "0deg", "45deg"],
          bottom: ["35%", "50%", "50%"],
          left: "50%",
        },
        closed: {
          rotate: ["45deg", "0deg", "0deg"],
          bottom: ["50%", "50%", "35%"],
          left: "calc(50% + 10px)",
        },
      },
    };
  }, []);

  const [active, setActive] = useState(false);

  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <motion.div
        animate={active ? "open" : "closed"}
        className="relative mx-1 sm:mx-3 sm:hidden"
      >
        <motion.button
          initial={false}
          animate={active ? "open" : "closed"}
          onClick={useCallback(
            function setHamburgerMenu() {
              setActive((pv) => !pv);
            },
            [setActive]
          )}
          className="relative h-16 w-16 rounded-full transition-colors hover:bg-gradient-to-br hover:from-violet-600 hover:to-indigo-700 bg-gradient-to-br from-violet-500 to-indigo-500"
        >
          <motion.span
            variants={VARIANTS.top}
            className="absolute h-1 w-10 bg-white"
            style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
          />
          <motion.span
            variants={VARIANTS.middle}
            className="absolute h-1 w-10 bg-white"
            style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
          />
          <motion.span
            variants={VARIANTS.bottom}
            className="absolute h-1 w-5 bg-white"
            style={{
              x: "-50%",
              y: "50%",
              bottom: "35%",
              left: "calc(50% + 10px)",
            }}
          />
        </motion.button>
        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateY: "40%" }}
          className="flex flex-col gap-2 p-2 rounded-lg shadow-xl bg-white absolute top-0 right-0 w-full overflow-hidden"
        >
          {ROOT_ROUTES.map((it) => (
            <Link to={it.path}>
              <MenuBarItem
                setActive={setActive}
                Icon={it.icon}
                text={it.label}
              />
            </Link>
          ))}
        </motion.ul>
      </motion.div>
    </MotionConfig>
  );
});

type TMenuBarItemsProps = {
  text: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  setActive: Dispatch<SetStateAction<boolean>>;
};

const MenuBarItem = (props: TMenuBarItemsProps) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => props.setActive(false)}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        <props.Icon />
      </motion.span>
      <span>{props.text}</span>
    </motion.li>
  );
};

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};

export default MobileMenu;
