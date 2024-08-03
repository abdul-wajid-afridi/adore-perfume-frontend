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
import { Link, useNavigate } from "react-router-dom";
import { ROOT_ROUTES } from "../../constants/routes";
import { List, LucideProps, ShoppingCart, Store } from "lucide-react";
import useIsMobileScreen from "../../hooks/isMobileView";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../components/ui/navigation-menu";
import { useAppSelector } from "../../hooks/hook";
import { useGetAllCategory } from "../../api/categories/queries";
import Loader from "../loader";

const Navbar = memo(function Navbar() {
  const { cartItems } = useAppSelector((state) => state.cart);
  const { isLoading, data } = useGetAllCategory();
  const navigate = useNavigate();

  const isMobileScreen = useIsMobileScreen();
  const [active, setActive] = useState(true);
  // const isLoggedIn = localStorage.getItem("token");

  // const logOutUser = useCallback(function logOutUser() {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  // }, []);

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
        className="relative py-1 px-[20px] flex justify-between items-center"
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
          className="relative sm:hidden h-[3.5rem] w-[3.5rem] rounded-full transition-colors hover:bg-gradient-to-br hover:from-violet-600 hover:to-indigo-700 bg-gradient-to-br from-violet-500 to-indigo-500"
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
          style={{ originY: "top", translateY: isMobileScreen ? "25%" : "0%" }}
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
              <NavigationMenu className="z-50">
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
                        <div className="w-[120px] z-50 flex flex-col border rounded-md text-center">
                          <Link
                            to="/about"
                            className="border-b text-sm cursor-pointer  hover:bg-secondary text-slate-700 hover:text-primary transition-colors p-2"
                          >
                            About us
                          </Link>
                          <Link
                            to="/careers"
                            className="border-b text-sm cursor-pointer  hover:bg-secondary text-slate-700 hover:text-primary transition-colors p-2"
                          >
                            Careers
                          </Link>
                          <Link
                            to="/contact-us"
                            className="border-b z-[999] overflow-hidden text-sm cursor-pointer  hover:bg-secondary text-slate-700 hover:text-primary transition-colors p-2"
                          >
                            Contact us
                          </Link>

                          <Link
                            to="/reviews"
                            className="border-b text-sm cursor-pointer  hover:bg-secondary text-slate-700 hover:text-primary transition-colors p-2"
                          >
                            Reviews
                          </Link>
                        </div>
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </motion.span>
          </motion.li>

          <motion.li variants={itemVariants}>
            <motion.span variants={actionIconVariants}>
              <NavigationMenu className="z-40">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>
                      <Store className="mr-3" /> Online Store
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                      {isLoading ? (
                        <div className="w-[180px] h-10 flex justify-center items-center">
                          <Loader />
                        </div>
                      ) : (
                        <>
                          {data?.map((category) => (
                            <NavigationMenuLink
                              onClick={function toggleMenu() {
                                isMobileScreen && setActive(false);
                                navigate(`/search?category=${category.name}`);
                              }}
                            >
                              <div className="w-[170px] flex flex-col border rounded-md text-center">
                                <p className="border-b text-sm cursor-pointer capitalize hover:bg-secondary text-slate-700 hover:text-primary transition-colors p-2">
                                  {category.name}
                                </p>
                                {/* <Link
                            to="/about"
                            className="border-b text-sm cursor-pointer  hover:bg-secondary text-slate-700 hover:text-primary transition-colors p-2"
                          >
                            About us
                          </Link>
                          <Link
                            to="/reviews"
                            className="border-b text-sm cursor-pointer  hover:bg-secondary text-slate-700 hover:text-primary transition-colors p-2"
                          >
                            Reviews
                          </Link> */}
                              </div>
                            </NavigationMenuLink>
                          ))}
                          <div className="w-[170px] flex flex-col border rounded-md text-center">
                            <p
                              onClick={() => navigate(`/best-selling`)}
                              className="border-b text-sm cursor-pointer capitalize hover:bg-secondary text-slate-700 hover:text-primary transition-colors p-2"
                            >
                              Best Selling
                            </p>
                          </div>
                        </>
                      )}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </motion.span>
          </motion.li>

          <Link to="/cart">
            <MenuBarItem
              count={cartItems.length}
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
        <span className="absolute top-0 left-14 text-center w-4 h-4 rounded-full  bg-primary text-secondary">
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
