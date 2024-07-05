import {
  type ReactNode,
  memo,
  useRef,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { ROOT_ROUTES } from "../../constants/routes";

const Navbar = memo(function Navbar() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <div className="flex justify-between sm:justify-around items-center px-1 sm:px-0">
      <div className="">
        <img
          src="/adore-logo.png"
          alt="adore-logo"
          className="h-[80px] w-[120px] cursor-pointer"
        />
      </div>
      <ul
        onMouseLeave={useCallback(function setBackCursorPosition() {
          setPosition(function setCursorPosition(pv) {
            return {
              ...pv,
              opacity: 0,
            };
          });
        }, [])}
        className="relative h-fit rounded-full border shadow-md p-1 hidden sm:flex"
      >
        {ROOT_ROUTES.map((it) => {
          return (
            <Tab setPosition={setPosition}>
              <Link className="md:px-5 md:py-3 px-3 py-1.5 " to={it.path}>
                {it.label}
              </Link>
            </Tab>
          );
        })}

        <Cursor position={position} />
      </ul>
      <div className="flex flex-col items-end">
        <span className="px-1 bg-yellow-300 w-fit rounded-full">{2}</span>
        <Link to="add-to-cart">
          <ShoppingCart />
        </Link>
      </div>
    </div>
  );
});

type TTabProps = {
  children: ReactNode;
  setPosition: Dispatch<
    SetStateAction<{
      left: number;
      width: number;
      opacity: number;
    }>
  >;
};

const Tab = memo(function Tab(props: TTabProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onMouseEnter={useCallback(
        function HoverMouseOverTabs() {
          if (!ref?.current) return;

          const { width } = ref.current.getBoundingClientRect();

          props.setPosition({
            left: ref.current.offsetLeft,
            width,
            opacity: 1,
          });
        },
        [props.setPosition, ref.current]
      )}
      className="relative z-10  uppercase text-white mix-blend-difference md:px-5 md:py-3 px-3 py-1.5 md:text-base text-xs "
    >
      {props.children}
    </div>
  );
});

type TCursorProps = {
  position: {
    left: number;
    width: number;
    opacity: number;
  };
};

const Cursor = memo(function Cursor(props: TCursorProps) {
  return (
    <motion.li
      animate={{
        ...props.position,
      }}
      className="absolute z-0 h-7 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 md:h-12"
    />
  );
});

export default Navbar;
