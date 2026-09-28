import { useSelector } from "@tanstack/react-store";
import { ButtonFlex, Flex } from "../shared";
import { toastActions, toastStore } from "@/stores/page.store";
import { CloseCircle, Danger, TickCircle } from "iconsax-reactjs";
import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";

function Toast() {
  const toastState = useSelector(toastStore);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (toastState.show) {
      timeout = setTimeout(() => {
        toastActions.hideToast();
      }, 4000);
    }

    return () => clearTimeout(timeout);
  }, [toastState.show]);

  return (
    <AnimatePresence>
      {toastState.show && (
        <motion.div
          initial={{
            opacity: 0,
            x: "100%",
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: "100%",
          }}
          className="flex flex-row items-center absolute top-6 right-6 min-w-90 bg-white px-6 py-4.5 shadow-md border border-neutral-200 rounded-md gap-3.5"
        >
          <Flex
            className={`size-10 rounded-full items-center justify-center ${toastState.type === "success" ? "bg-green-100" : "bg-red-100"}`}
          >
            {toastState.type === "success" ? (
              <TickCircle size={18} color="var(--green-500)" />
            ) : (
              <Danger size={18} color="var(--red-500)" />
            )}
          </Flex>

          <Flex className="flex-1 gap-1.5">
            <p className="text-body-xs font-semibold text-neutral-900">
              {toastState.message.split("|")[0]}
            </p>

            <p className="text-body-xs text-neutral-900">
              {toastState.message.split("|")[1]}
            </p>
          </Flex>

          <ButtonFlex className="size-8 rounded-lg justify-center hover:bg-neutral-200 transition-colors duration-300">
            <CloseCircle size={18} color="var(--neutral-400)" />
          </ButtonFlex>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;
