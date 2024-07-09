import {
  Dispatch,
  ForwardRefExoticComponent,
  RefAttributes,
  SetStateAction,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { MotionConfig, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ROOT_ROUTES } from "../../constants/routes";
import { List, LucideProps, ShoppingCart } from "lucide-react";
import useIsMobileScreen from "../../hooks/isMobileView";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../components/ui/navigation-menu";

const Navbar = memo(function Navbar() {
  const isMobileScreen = useIsMobileScreen();
  const [active, setActive] = useState(true);

  useEffect(
    function setNavbarActiveOnMount() {
      !isMobileScreen ? setActive(true) : setActive(false);
    },
    [isMobileScreen, setActive]
  );

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
  const logo = (
    <img
      src="/adore-logo.png"
      alt="adore-logo"
      className="h-10 w-[120px] cursor-pointer"
    />
  );
  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <motion.div
        animate={active ? "open" : "closed"}
        className="relative py-1 mx-1 sm:mx-3 flex justify-between items-center"
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
          className="relative sm:hidden h-16 w-16 rounded-full transition-colors hover:bg-gradient-to-br hover:from-violet-600 hover:to-indigo-700 bg-gradient-to-br from-violet-500 to-indigo-500"
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
        {/* show logo on mobile on right */}
        <div>{isMobileScreen && logo}</div>
        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateY: isMobileScreen ? "28%" : "0%" }}
          className="flex sm:flex-row flex-col p-2 rounded-lg shadow-xl z-50 bg-white absolute sm:relative top-0 right-0 w-full"
        >
          {ROOT_ROUTES.map((it) => (
            <Link to={it.path} key={it.path}>
              <MenuBarItem
                setActive={setActive}
                Icon={it.icon}
                text={it.label}
              />
            </Link>
          ))}

          <motion.li variants={itemVariants}>
            <motion.span variants={actionIconVariants}>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <List className="mr-3" /> Menu
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink
                        onClick={useCallback(
                          function toggleMenu() {
                            isMobileScreen && setActive(false);
                          },
                          [isMobileScreen, setActive]
                        )}
                      >
                        <div className="w-[150px] flex flex-col border rounded-md text-center">
                          <Link
                            to="/contact"
                            className="border-b text-sm cursor-pointer  hover:bg-secondary text-slate-700 hover:text-primary transition-colors p-2"
                          >
                            contact us
                          </Link>
                          <Link
                            to="/about"
                            className="border-b text-sm cursor-pointer  hover:bg-secondary text-slate-700 hover:text-primary transition-colors p-2"
                          >
                            About us
                          </Link>
                          <Link
                            to="/review"
                            className="border-b text-sm cursor-pointer  hover:bg-secondary text-slate-700 hover:text-primary transition-colors p-2"
                          >
                            Review
                          </Link>
                          <Link
                            to="/login"
                            className="border-b text-sm cursor-pointer  hover:bg-secondary text-slate-700 hover:text-primary transition-colors p-2"
                          >
                            {/* NOTE: if logged in use logout else login */}
                            Login
                          </Link>
                        </div>
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </motion.span>
          </motion.li>

          <Link to="/cart">
            <MenuBarItem
              count={12}
              setActive={setActive}
              Icon={ShoppingCart}
              text={"Cart"}
            />
          </Link>
          {/* show logo on desktop on right */}
          <div className="flex w-full justify-end self-end">
            {!isMobileScreen && logo}
          </div>
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
  count?: number;
};

const MenuBarItem = (props: TMenuBarItemsProps) => {
  const isMobileScreen = useIsMobileScreen();

  return (
    <motion.li
      variants={itemVariants}
      onClick={() => isMobileScreen && props.setActive(false)}
      className="relative flex items-center gap-1 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-secondary text-slate-700 hover:text-primary transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        <props.Icon />
      </motion.span>
      <span>{props.text}</span>
      {props.count && (
        <span className="absolute -top-1 left-14 rounded-md px-[2px] py-[1px]  bg-primary text-secondary">
          {props.count}
        </span>
      )}
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

export default Navbar;
