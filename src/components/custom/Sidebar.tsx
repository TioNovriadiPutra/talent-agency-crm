import { LogoutCurve, UserSquare } from "iconsax-reactjs";
import { ButtonFlex, Flex } from "../shared";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "@tanstack/react-store";
import { authStore } from "@/stores/page.store";
import LogoutModal from "./LogoutModal";
import { useState } from "react";
import { sidebarMenu } from "@/utils/page_data";

function Sidebar() {
  const [modal, setModal] = useState(false);

  const authState = useSelector(authStore);

  const { pathname } = useRouter();

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <Flex className="w-65 shrink-0 border-r border-r-neutral-200 gap-2 overflow-hidden bg-primary-900">
      <Flex className="p-6">
        <Flex className="gap-0.5 border border-neutral-600 p-3 rounded-lg shadow-md">
          <p className="text-body-xs text-primary-500">WORKSPACE</p>

          <p className="text-body-s font-medium text-white">
            {authState.agency_name}
          </p>
        </Flex>
      </Flex>

      <Flex className="flex-1 gap-1 px-3.5">
        {sidebarMenu.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              key={index.toString()}
              href={item.dest}
              className={`flex items-center px-3 py-2.5 gap-3 rounded-lg ${pathname === item.dest ? "bg-primary-800 text-white" : "bg-transparent text-primary-400"} hover:bg-primary-800 hover:text-white transition-colors duration-300`}
            >
              <Icon size={18} strokeWidth={1.25} />

              <span className="text-body-s font-medium">{item.label}</span>
            </Link>
          );
        })}
      </Flex>

      <Flex className="py-2.5 bg-primary-900 border-t border-t-primary-800">
        <Flex className="flex-row! items-center px-3.5 gap-3">
          <Flex className="min-w-0 flex-1 flex-row! items-center p-1.5 gap-3">
            <Flex className="size-10 shrink-0 items-center justify-center rounded-lg bg-accent-300">
              <UserSquare size={20} color="var(--accent-900)" />
            </Flex>

            <Flex className="min-w-0 flex-1 gap-0.5">
              <p
                title={authState.email}
                className="truncate text-body-s font-medium text-white"
              >
                {authState.email}
              </p>

              <p className="truncate text-body-xs text-primary-500">
                {authState.role}
              </p>
            </Flex>
          </Flex>

          <ButtonFlex
            className="shrink-0 size-8 justify-center rounded-md bg-transparent text-white hover:bg-red-100 hover:text-red-600 transition-colors duration-300"
            onClick={openModal}
          >
            <LogoutCurve size={16} />
          </ButtonFlex>
        </Flex>
      </Flex>

      <LogoutModal modalState={modal} closeModal={closeModal} />
    </Flex>
  );
}

export default Sidebar;
