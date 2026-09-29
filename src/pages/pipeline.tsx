import {
  Button,
  ButtonFlex,
  Flex,
  MainContainer,
  SearchInput,
  Table,
  TablePagination,
} from "@/components/shared";
import { dealBaruHeader, pipelineFilter } from "@/utils/page_data";
import { AddCircle } from "iconsax-reactjs";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { DropdownType } from "@/interfaces/page.interface";
import useDealController from "@/controllers/useDealController";
import { useRouter } from "next/router";

function Pipeline() {
  const [currFilter, setCurrFilter] = useState<DropdownType>(pipelineFilter[0]);
  const [buttonWidths, setButtonWidths] = useState<number[]>([]);
  const [currPage, setCurrPage] = useState(1);

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = pipelineFilter.findIndex(
    (item) => item.value === currFilter.value,
  );
  const activeWidth = buttonWidths[activeIndex] ?? 0;
  const activeX = buttonWidths
    .slice(0, Math.max(activeIndex, 0))
    .reduce((total, width) => total + width, 0);

  const router = useRouter();

  const { control } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const searchInput = useWatch({
    control,
    name: "search",
  });

  const { useGetDealsService } = useDealController();

  const { finalData, isLoading } = useGetDealsService(currPage, searchInput);

  const onNext = () => setCurrPage((prev) => prev + 1);

  const onPrev = () => setCurrPage((prev) => prev - 1);

  useEffect(() => {
    const measure = () => {
      setButtonWidths(
        buttonRefs.current.map(
          (button) => button?.getBoundingClientRect().width ?? 0,
        ),
      );
    };

    const observer = new ResizeObserver(measure);

    buttonRefs.current.forEach((button) => {
      if (button) observer.observe(button);
    });

    measure();

    return () => observer.disconnect();
  }, []);

  return (
    <MainContainer>
      <Flex className="flex-1 border border-neutral-300 bg-white shadow-sm rounded-lg">
        <Flex className="flex-row! items-center justify-between p-6">
          <Flex className="gap-1.5">
            <h1 className="text-neutral-900">Pipeline Deal</h1>

            <p className="text-body-s text-neutral-600">
              Satu alur per talent, dari inquiry sampai payout.
            </p>
          </Flex>

          <Button
            size="large"
            label="Tambah Inquiry"
            mode="secondary"
            icon={AddCircle}
            onClick={() => router.push("/deal/new")}
          />
        </Flex>

        <Flex className="flex-row! items-center justify-between px-6">
          <Flex className="relative flex-row! p-1.25 bg-neutral-200 rounded-md">
            {activeWidth > 0 && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute left-1.25 top-1.25 bottom-1.25 rounded-sm bg-primary-800 shadow-sm z-10"
                initial={false}
                animate={{
                  x: activeX,
                  width: activeWidth,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}

            {pipelineFilter.map((item, index) => (
              <ButtonFlex
                ref={(element) => {
                  buttonRefs.current[index] = element;
                }}
                key={index.toString()}
                className={`justify-center px-3 py-1.5 ${activeIndex === index ? "text-white font-bold" : "text-neutral-600 font-medium"} transition-all duration-300 text-body-xs z-20`}
                onClick={() => setCurrFilter(item)}
              >
                {item.label}
              </ButtonFlex>
            ))}
          </Flex>

          <Controller
            control={control}
            name="search"
            render={({ field }) => <SearchInput field={field} />}
          />
        </Flex>

        <Flex className="flex-1 mt-2">
          <Table
            dataHeader={dealBaruHeader}
            data={finalData.table}
            withAction
            isLoading={isLoading}
          />

          <TablePagination
            paginationData={finalData.pagination}
            onNext={onNext}
            onPrev={onPrev}
          />
        </Flex>
      </Flex>
    </MainContainer>
  );
}

export default Pipeline;
