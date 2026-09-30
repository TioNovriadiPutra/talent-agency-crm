import { Controller, ControllerRenderProps, FieldError } from "react-hook-form";
import Flex from "./Flex";
import ButtonFlex from "./ButtonFlex";
import { DropdownType } from "@/interfaces/page.interface";
import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Box } from "iconsax-reactjs";
import { Squircle } from "ldrs/react";
import "ldrs/react/Squircle.css";
import { ComboboxSearchInput } from "../custom";

type Props = {
  field: ControllerRenderProps<any, any>;
  label?: string;
  required?: boolean;
  error?: FieldError;
  dropdownData: DropdownType[];
  searchControl: any;
  isLoading?: boolean;
};

function ComboboxInput({
  field,
  label,
  required,
  error,
  dropdownData,
  searchControl,
  isLoading,
}: Props) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const trigger = triggerRef.current;
    const dropdown = dropdownRef.current;

    if (!openDropdown || !trigger || !dropdown) return;

    function positionDropdown() {
      if (!trigger || !dropdown) return;
      const anchor = trigger.getBoundingClientRect();
      const gap = 8;
      const margin = 16;
      const spaceBelow = Math.max(
        0,
        window.innerHeight - anchor.bottom - gap - margin,
      );
      const spaceAbove = Math.max(0, anchor.top - gap - margin);
      // Measure the children so a constrained dropdown can expand again.
      const contentHeight = Array.from(dropdown.children).reduce(
        (height, child) => height + (child as HTMLElement).offsetHeight,
        dropdown.offsetHeight - dropdown.clientHeight,
      );
      const placeBelow =
        contentHeight <= spaceBelow || spaceBelow >= spaceAbove;

      dropdown.style.transformOrigin = placeBelow ? "top left" : "bottom left";
      dropdown.style.maxHeight = `${placeBelow ? spaceBelow : spaceAbove}px`;
      dropdown.style.overflowY = "auto";
      dropdown.style.top = `${
        placeBelow
          ? trigger.offsetTop + trigger.offsetHeight + gap
          : trigger.offsetTop - gap - dropdown.offsetHeight
      }px`;
    }

    function handleOutsideClick(event: PointerEvent) {
      const target = event.target;
      if (
        target instanceof Node &&
        !trigger?.contains(target) &&
        !dropdown?.contains(target)
      ) {
        setOpenDropdown(false);
      }
    }

    positionDropdown();

    const observer = new ResizeObserver(positionDropdown);
    observer.observe(trigger);
    observer.observe(dropdown);
    Array.from(dropdown.children).forEach((child) => observer.observe(child));
    document.addEventListener("pointerdown", handleOutsideClick, true);
    window.addEventListener("resize", positionDropdown);
    window.addEventListener("scroll", positionDropdown, true);

    return () => {
      observer.disconnect();
      document.removeEventListener("pointerdown", handleOutsideClick, true);
      window.removeEventListener("resize", positionDropdown);
      window.removeEventListener("scroll", positionDropdown, true);
    };
  }, [openDropdown]);

  return (
    <Flex className="relative gap-2">
      {label && (
        <p className="text-body-s font-medium text-neutral-900">
          {label}{" "}
          {required && (
            <span className="text-red-600">
              * {error && `(${error.message})`}
            </span>
          )}
        </p>
      )}

      <ButtonFlex
        ref={triggerRef}
        className={`px-3 py-[11.5px] border ${error ? "border-red-500" : "border-neutral-400"} rounded-md gap-3.5`}
        onClick={() => setOpenDropdown((prev) => !prev)}
      >
        <p
          className={`flex-1 text-body-s font-normal ${field.value ? "text-neutral-900" : "text-neutral-500"} text-left`}
        >
          {field.value
            ? dropdownData.find((item) => item.value === field.value)!.label
            : label
              ? `Pilih ${label.toLowerCase()}...`
              : "Pilih disini..."}
        </p>
      </ButtonFlex>

      <AnimatePresence>
        {openDropdown && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: reducedMotion ? 1 : 0.95,
              pointerEvents: "none",
            }}
            transition={{ duration: reducedMotion ? 0 : 0.16, ease: "easeOut" }}
            className="absolute top-[calc(100%+8px)] left-0 right-0 border bg-white border-neutral-300 z-50 rounded-lg shadow-xl"
          >
            <Controller
              control={searchControl}
              name={`${field.name}Search`}
              render={({ field: searchField }) => (
                <ComboboxSearchInput field={searchField} />
              )}
            />

            <Flex className="p-1.25">
              {isLoading ? (
                <Flex className="items-center px-3 py-6">
                  <Squircle
                    size="24"
                    stroke="4"
                    strokeLength="0.15"
                    bgOpacity="0.1"
                    speed="0.9"
                    color={"var(--neutral-900)"}
                  />
                </Flex>
              ) : dropdownData.length === 0 ? (
                <div
                  role="status"
                  className="flex flex-col items-center gap-2 px-3 py-6 text-center"
                >
                  <Box size={24} color="var(--neutral-500)" />
                  <p className="text-body-s text-neutral-600">
                    Tidak ada pilihan tersedia
                  </p>
                </div>
              ) : (
                dropdownData.map((item, index) => (
                  <ButtonFlex
                    key={index.toString()}
                    className="p-2 rounded-md hover:bg-neutral-300 transition-colors duration-300"
                    onClick={() => {
                      field.onChange(item.value);
                      setOpenDropdown(false);
                    }}
                  >
                    <p className="text-body-s text-neutral-900">{item.label}</p>
                  </ButtonFlex>
                ))
              )}
            </Flex>
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  );
}

export default ComboboxInput;
