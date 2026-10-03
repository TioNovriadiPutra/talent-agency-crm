import { RefObject, useId, useLayoutEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useIsPresent,
  useReducedMotion,
} from "motion/react";
import Flex from "./Flex";
import DateCalendar, { DateRange, readRange, validDate } from "./DateCalendar";
import { formatDate } from "@/utils/client_helper";
import { Calendar } from "iconsax-reactjs";
import { FieldError } from "react-hook-form";

type Props = {
  field: {
    value: unknown;
    onChange: (value: string | DateRange) => void;
    onBlur: () => void;
    ref: (element: HTMLButtonElement | null) => void;
    name: string;
    disabled?: boolean;
  };
  label?: string;
  required?: boolean;
  mode?: "single" | "range";
  disabled?: boolean;
  error?: FieldError;
};

const DateInput = ({
  field,
  label,
  required,
  mode = "single",
  disabled,
  error,
}: Props) => {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const inputId = useId();
  const range = readRange(field.value);
  const single = validDate(field.value);
  const display =
    mode === "range"
      ? [range.start, range.end]
          .filter(Boolean)
          .map((date) => formatDate(date))
          .join(" – ")
      : single
        ? formatDate(single)
        : "";

  function close() {
    setOpen(false);
    field.onBlur();
  }

  return (
    <Flex className="gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-body-s font-medium text-neutral-900"
        >
          {label}{" "}
          {required && (
            <span className="text-red-600">
              * {error && `(${error.message})`}
            </span>
          )}
        </label>
      )}

      <button
        id={inputId}
        name={field.name}
        type="button"
        ref={(element) => {
          trigger.current = element;
          field.ref(element);
        }}
        disabled={disabled}
        aria-label={label || "Pilih tanggal"}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={`${inputId}-calendar`}
        onClick={() => setOpen(true)}
        onBlur={() => {
          if (!open) field.onBlur();
        }}
        className={`flex cursor-pointer items-center px-3 py-[11.5px] ${disabled && "bg-neutral-100"} border ${error ? "border-red-500" : "border-neutral-400"} rounded-md gap-3.5 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed`}
      >
        <span
          className={`flex-1 text-body-s font-normal ${field.value ? "text-neutral-900" : "text-neutral-500"} text-left`}
        >
          {display ||
            (mode === "range" ? "Tanggal awal – Tanggal akhir" : "DD MM YYYY")}
        </span>

        <Calendar size={18} color="var(--neutral-600)" />
      </button>

      <AnimatePresence>
        {open && (
          <CalendarDialog
            key="calendar"
            trigger={trigger}
            inputId={inputId}
            label={label}
            value={field.value}
            mode={mode}
            onCancel={close}
            onApply={(value) => {
              field.onChange(value);
              close();
            }}
          />
        )}
      </AnimatePresence>
    </Flex>
  );
};

export default DateInput;

type CalendarDialogProps = {
  trigger: RefObject<HTMLButtonElement | null>;
  inputId: string;
  label?: string;
  value: unknown;
  mode: "single" | "range";
  onCancel: () => void;
  onApply: (value: string | DateRange) => void;
};

function CalendarDialog({
  trigger,
  inputId,
  label,
  value,
  mode,
  onCancel,
  onApply,
}: CalendarDialogProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const reducedMotion = useReducedMotion();
  const isPresent = useIsPresent();

  useLayoutEffect(() => {
    if (!dialog.current) return;
    const panel = dialog.current;
    panel.showModal();
    function position() {
      if (!trigger.current) return;
      const anchor = trigger.current.getBoundingClientRect();
      const margin = 16;
      const gap = 8;
      const spaceBelow = Math.max(
        0,
        window.innerHeight - anchor.bottom - gap - margin,
      );
      const spaceAbove = Math.max(0, anchor.top - gap - margin);
      // Use unscaled layout dimensions so animation does not change placement.
      const contentHeight =
        ((panel.firstElementChild as HTMLElement | null)?.offsetHeight ??
          panel.scrollHeight) +
        panel.offsetHeight -
        panel.clientHeight;
      const placeBelow =
        contentHeight <= spaceBelow || spaceBelow >= spaceAbove;
      const availableHeight = placeBelow ? spaceBelow : spaceAbove;

      const left = Math.max(
        margin,
        Math.min(anchor.left, window.innerWidth - panel.offsetWidth - margin),
      );
      const originX =
        anchor.left + anchor.width / 2 > left + panel.offsetWidth / 2
          ? "right"
          : "left";
      panel.style.transformOrigin = `${originX} ${placeBelow ? "top" : "bottom"}`;
      panel.style.maxHeight = `${availableHeight}px`;
      panel.style.left = `${left}px`;
      panel.style.top = `${placeBelow ? anchor.bottom + gap : anchor.top - gap - panel.offsetHeight}px`;
    }
    position();
    panel
      .querySelector<HTMLButtonElement>(
        'button[aria-pressed="true"], button[aria-current="date"]',
      )
      ?.focus({ preventScroll: true });
    const observer = new ResizeObserver(position);
    observer.observe(panel);
    if (panel.firstElementChild) observer.observe(panel.firstElementChild);
    window.addEventListener("resize", position);
    window.addEventListener("scroll", position, true);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", position);
      window.removeEventListener("scroll", position, true);
      panel.close();
    };
  }, [trigger]);

  return (
    <motion.dialog
      ref={dialog}
      inert={!isPresent}
      initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.92 }}
      transition={{ duration: reducedMotion ? 0 : 0.16, ease: "easeOut" }}
      id={`${inputId}-calendar`}
      aria-label={label ? `Pilih ${label}` : "Pilih tanggal"}
      onCancel={(event) => {
        event.preventDefault();
        if (isPresent) onCancel();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        )
          if (isPresent) onCancel();
      }}
      className="fixed m-0 max-h-[calc(100dvh-32px)] w-130 max-w-[calc(100vw-32px)] overflow-y-auto rounded-lg border border-neutral-300 bg-white p-0 shadow-xl backdrop:bg-transparent"
    >
      <DateCalendar
        value={value}
        mode={mode}
        onCancel={onCancel}
        onApply={onApply}
      />
    </motion.dialog>
  );
}
