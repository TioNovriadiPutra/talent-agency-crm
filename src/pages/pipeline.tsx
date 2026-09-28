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
import { Controller, useForm } from "react-hook-form";
import useDealController from "@/controllers/useDealController";
import { generateDealBaruData } from "@/utils/dummy_data";
import { InferGetServerSidePropsType } from "next";
import { DropdownType } from "@/interfaces/page.interface";

export const getServerSideProps = async () => {
  return {
    props: {
      deals: generateDealBaruData(),
    },
  };
};

function Pipeline({
  deals,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [currFilter, setCurrFilter] = useState<DropdownType>(pipelineFilter[0]);
  const [buttonWidths, setButtonWidths] = useState<number[]>([]);

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = pipelineFilter.findIndex(
    (item) => item.value === currFilter.value,
  );
  const activeWidth = buttonWidths[activeIndex] ?? 0;
  const activeX = buttonWidths
    .slice(0, Math.max(activeIndex, 0))
    .reduce((total, width) => total + width, 0);

  const { control } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const { useGetDealsService } = useDealController();

  const { finalData } = useGetDealsService(deals, currFilter);

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
      <Flex className="flex-1 border border-neutral-200 rounded-lg">
        <Flex className="flex-row! items-center justify-between p-6">
          <Flex className="gap-1.5">
            <h1 className="text-neutral-900">Pipeline Deal</h1>

            <p className="text-body-s text-neutral-500">
              Satu alur per talent, dari inquiry sampai payout.
            </p>
          </Flex>

          <Button size="large" label="Tambah Inquiry" icon={AddCircle} />
        </Flex>

        <Flex className="flex-row! items-center justify-between px-6">
          <Flex className="relative flex-row! p-1.25 bg-neutral-100 rounded-md">
            {activeWidth > 0 && (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute left-1.25 top-1.25 bottom-1.25 rounded-sm bg-white shadow-sm z-10"
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
                className={`justify-center px-3 py-1.5 ${activeIndex === index ? "text-neutral-900" : "text-neutral-500"} text-body-xs font-bold z-20`}
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
          <Table dataHeader={dealBaruHeader} data={finalData} withAction />

          <TablePagination />
        </Flex>
      </Flex>
    </MainContainer>
  );
}

export default Pipeline;
