import { UseMutationResult } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { TPackingResponse } from "../../api/packing/fetchers";

type TModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setColor: Dispatch<SetStateAction<string>>;
  mutation: UseMutationResult<TPackingResponse>;
  id: number;
};

const COLORS = ["red", "yellow", "pink", "blue", "purple"];
const Modal = (props: TModalProps) => {
  return (
    <AnimatePresence>
      {props.isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => props.setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <AlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <AlertCircle />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                select your color!
              </h3>
              <div className="flex flex-wrap justify-between my-10 gap-3">
                {COLORS.map((color) => (
                  <div
                    onClick={() => {
                      props.setIsOpen(false);
                      props.setColor(color);
                      props.mutation.mutate({
                        packingId: props.id,
                        data: { color },
                      });
                    }}
                    className="h-10 w-14 rounded-lg shadow-md hover:scale-105"
                    style={{ background: color }}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                {/* <button
                  onClick={() => props.setIsOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Nah, go back
                </button>
                <button
                  onClick={() => props.setIsOpen(false)}
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  Understood!
                </button> */}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
