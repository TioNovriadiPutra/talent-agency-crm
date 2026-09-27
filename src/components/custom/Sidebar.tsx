import {
  ClipboardText,
  Element4,
  LogoutCurve,
  Moneys,
  Star1,
  UserSquare,
} from "iconsax-reactjs";
import { ButtonFlex, Flex } from "../shared";
import { useRouter } from "next/router";
import Link from "next/link";

function Sidebar() {
  const { pathname } = useRouter();

  return (
    <Flex className="w-65 bg-neutral-50 border-r border-r-neutral-200 gap-2">
      <Flex className="p-6">
        <Flex className="gap-0.5 border border-neutral-200 p-3 rounded-lg bg-white shadow-md">
          <p className="text-body-xs text-neutral-500">WORKSPACE</p>

          <p className="text-body-s font-medium text-neutral-900">
            Aseek Talent Agency
          </p>
        </Flex>
      </Flex>

      <Flex className="flex-1 gap-1 px-3.5">
        <Link
          href="/"
          className={`flex items-center px-3 py-2.5 gap-3 rounded-lg ${pathname === "/" ? "bg-neutral-200 text-neutral-900" : "bg-transparent text-neutral-600"} text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 transition-colors duration-300`}
        >
          <Element4 size={18} strokeWidth={1.25} />

          <span className="text-body-s font-medium">Dashboard</span>
        </Link>

        <Link
          href="/pipeline"
          className={`flex items-center px-3 py-2.5 gap-3 rounded-lg ${pathname === "/pipeline" ? "bg-neutral-200 text-neutral-900" : "bg-transparent text-neutral-600"} text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 transition-colors duration-300`}
        >
          <ClipboardText size={18} strokeWidth={1.25} />

          <span className="text-body-s font-medium">Pipeline Deal</span>
        </Link>

        <Link
          href="/talent"
          className={`flex items-center px-3 py-2.5 gap-3 rounded-lg ${pathname === "/talent" ? "bg-neutral-200 text-neutral-900" : "bg-transparent text-neutral-600"} text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 transition-colors duration-300`}
        >
          <Star1 size={18} strokeWidth={1.25} />

          <span className="text-body-s font-medium">Talent</span>
        </Link>

        <Link
          href="/finance"
          className={`flex items-center px-3 py-2.5 gap-3 rounded-lg ${pathname === "/finance" ? "bg-neutral-200 text-neutral-900" : "bg-transparent text-neutral-600"} text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900 transition-colors duration-300`}
        >
          <Moneys size={18} strokeWidth={1.25} />

          <span className="text-body-s font-medium">Finance</span>
        </Link>
      </Flex>

      <Flex className="py-2.5 bg-white border-t border-t-neutral-200">
        <Flex className="flex-row! items-center px-3.5 gap-3">
          <Flex className="flex-1 flex-row! items-center p-1.5 gap-3">
            <Flex className="size-10 items-center justify-center rounded-lg bg-neutral-50">
              <UserSquare size={20} color="var(--neutral-500)" />
            </Flex>

            <Flex className="gap-0.5">
              <p className="text-body-s font-medium text-neutral-900">
                John Doe
              </p>

              <p className="text-body-xs text-neutral-500">Manager</p>
            </Flex>
          </Flex>

          <ButtonFlex className="size-8 justify-center rounded-md bg-transparent text-neutral-400 hover:bg-red-100 hover:text-red-600 transition-colors duration-300">
            <LogoutCurve size={16} />
          </ButtonFlex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Sidebar;
