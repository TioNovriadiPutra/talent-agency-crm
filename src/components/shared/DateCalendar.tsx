import { useEffect, useRef, useState } from "react";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isValid,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { id } from "date-fns/locale";
import { ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";

export type DateRange = { start: string; end: string };

export function validDate(value: unknown): string {
  return typeof value === "string" && value && isValid(parseISO(value))
    ? format(parseISO(value), "yyyy-MM-dd")
    : "";
}

export function readRange(value: unknown): DateRange {
  if (!value || typeof value !== "object") return { start: "", end: "" };
  const range = value as Partial<DateRange>;
  const start = validDate(range.start);
  const end = validDate(range.end);
  return { start, end: start && end >= start ? end : "" };
}

type Props = {
  value: unknown;
  mode: "single" | "range";
  onApply: (value: string | DateRange) => void;
  onCancel: () => void;
};

const weekdays = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const buttonClass =
  "cursor-pointer rounded-md border border-neutral-300 p-1.5 text-neutral-900 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2";

export default function DateCalendar({
  value,
  mode,
  onApply,
  onCancel,
}: Props) {
  const initial =
    mode === "range" ? readRange(value) : { start: validDate(value), end: "" };
  const [selection, setSelection] = useState(initial);
  const [month, setMonth] = useState(() =>
    startOfMonth(initial.start ? parseISO(initial.start) : new Date()),
  );
  const [focused, setFocused] = useState(
    initial.start || format(new Date(), "yyyy-MM-dd"),
  );
  const root = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef(false);

  useEffect(() => {
    if (pendingFocus.current) {
      root.current
        ?.querySelector<HTMLButtonElement>(`[data-date="${focused}"]`)
        ?.focus();
      pendingFocus.current = false;
    }
  }, [focused, month]);

  function select(day: string) {
    setFocused(day);
    if (mode === "single" || !selection.start || selection.end) {
      setSelection({ start: day, end: "" });
    } else {
      setSelection(
        day < selection.start
          ? { start: day, end: selection.start }
          : { start: selection.start, end: day },
      );
    }
  }

  function moveFocus(day: Date) {
    pendingFocus.current = true;
    setFocused(format(day, "yyyy-MM-dd"));
    if (!isSameMonth(day, month) && !isSameMonth(day, addMonths(month, 1)))
      setMonth(startOfMonth(day));
  }

  function navigate(amount: number) {
    const next = addMonths(month, amount);
    setMonth(next);
    setFocused(format(next, "yyyy-MM-dd"));
  }

  const complete = Boolean(
    selection.start && (mode === "single" || selection.end),
  );

  return (
    <div ref={root} className="w-full bg-white text-xs text-neutral-900">
      <div
        className="relative grid grid-cols-2 items-center border-b border-neutral-200 py-3.5 text-center"
        aria-live="polite"
      >
        <button
          type="button"
          aria-label="Bulan sebelumnya"
          onClick={() => navigate(-1)}
          className={`${buttonClass} absolute left-3`}
        >
          <ArrowLeft2 size={16} />
        </button>
        {[month, addMonths(month, 1)].map((date) => (
          <span
            key={date.toISOString()}
            className="px-9 text-xs font-semibold sm:text-sm"
          >
            {format(date, "MMMM yyyy", { locale: id })}
          </span>
        ))}
        <button
          type="button"
          aria-label="Bulan berikutnya"
          onClick={() => navigate(1)}
          className={`${buttonClass} absolute right-3`}
        >
          <ArrowRight2 size={16} />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {[month, addMonths(month, 1)].map((displayMonth, monthIndex) => {
          const days = eachDayOfInterval({
            start: startOfWeek(startOfMonth(displayMonth)),
            end: endOfWeek(endOfMonth(displayMonth)),
          });
          const hasFocus = isSameMonth(parseISO(focused), displayMonth);
          return (
            <div
              key={displayMonth.toISOString()}
              className={`px-3 pb-3 ${monthIndex ? "border-t border-neutral-100 sm:border-t-0 sm:border-l" : ""}`}
            >
              <p className="pt-3 text-center font-semibold sm:hidden">
                {format(displayMonth, "MMMM yyyy", { locale: id })}
              </p>
              <div
                className="grid grid-cols-7 py-3 text-center text-xs font-medium text-neutral-600"
                aria-hidden="true"
              >
                {weekdays.map((day, index) => (
                  <span key={day} className={index === 0 ? "text-red-500" : ""}>
                    {day}
                  </span>
                ))}
              </div>
              <div
                role="group"
                aria-label={format(displayMonth, "MMMM yyyy", { locale: id })}
                className="grid grid-cols-7 gap-y-1"
              >
                {days.map((day, index) => {
                  if (!isSameMonth(day, displayMonth))
                    return (
                      <span key={index} aria-hidden="true" className="h-7" />
                    );
                  const key = format(day, "yyyy-MM-dd");
                  const endpoint =
                    key === selection.start || key === selection.end;
                  const inRange = Boolean(
                    selection.end &&
                    key >= selection.start &&
                    key <= selection.end,
                  );
                  const roundedStart =
                    key === selection.start ||
                    day.getDay() === 0 ||
                    day.getDate() === 1;
                  const roundedEnd =
                    key === selection.end ||
                    day.getDay() === 6 ||
                    key === format(endOfMonth(day), "yyyy-MM-dd");
                  return (
                    <div
                      key={key}
                      className={`flex h-7 justify-center ${inRange ? "bg-[#e9e9e9]" : ""} ${roundedStart ? "rounded-l-full" : ""} ${roundedEnd ? "rounded-r-full" : ""}`}
                    >
                      <button
                        type="button"
                        data-date={key}
                        aria-label={format(day, "EEEE, d MMMM yyyy", {
                          locale: id,
                        })}
                        aria-pressed={endpoint || inRange}
                        aria-current={
                          key === format(new Date(), "yyyy-MM-dd")
                            ? "date"
                            : undefined
                        }
                        tabIndex={
                          key === focused || (!hasFocus && day.getDate() === 1)
                            ? 0
                            : -1
                        }
                        onClick={() => select(key)}
                        onKeyDown={(event) => {
                          const offsets: Record<string, number> = {
                            ArrowLeft: -1,
                            ArrowRight: 1,
                            ArrowUp: -7,
                            ArrowDown: 7,
                          };
                          let target: Date | undefined;
                          if (event.key in offsets)
                            target = addDays(day, offsets[event.key]);
                          if (event.key === "Home") target = startOfWeek(day);
                          if (event.key === "End") target = endOfWeek(day);
                          if (event.key === "PageUp")
                            target = addMonths(day, -1);
                          if (event.key === "PageDown")
                            target = addMonths(day, 1);
                          if (target) {
                            event.preventDefault();
                            moveFocus(target);
                          }
                        }}
                        className={`size-7 cursor-pointer rounded-full text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 ${endpoint ? "bg-[#1e2932] text-white" : `${day.getDay() === 0 ? "text-red-500" : "text-neutral-800"} hover:bg-neutral-300`}`}
                      >
                        {day.getDate()}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 p-3">
        <div className="flex items-center gap-2" aria-live="polite">
          {[selection.start, ...(mode === "range" ? [selection.end] : [])].map(
            (date, index) => (
              <div key={index} className="flex items-center gap-2">
                {index === 1 && <span className="text-neutral-600">-</span>}
                <output
                  aria-label={index === 0 ? "Tanggal awal" : "Tanggal akhir"}
                  className="min-w-24 rounded-md border border-neutral-300 px-2 py-1.5 text-center"
                >
                  {date
                    ? format(parseISO(date), "dd / MM / yyyy")
                    : "DD / MM / YYYY"}
                </output>
              </div>
            ),
          )}
        </div>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className={`${buttonClass} px-2.5`}
          >
            Batalkan
          </button>
          <button
            type="button"
            disabled={!complete}
            onClick={() =>
              onApply(mode === "range" ? selection : selection.start)
            }
            className="cursor-pointer rounded-md bg-[#1e2932] px-2.5 py-1.5 text-white hover:bg-[#303d48] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Atur Tanggal
          </button>
        </div>
      </div>
    </div>
  );
}
