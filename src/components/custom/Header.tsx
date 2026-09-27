import { useRouter } from "next/router";
import { Flex } from "../shared";

function extractPageName(pathname: string) {
  if (pathname === "/") return "Dashboard";
  if (pathname === "/pipeline") return "Pipeline Deal";
  if (pathname === "/talent") return "Talent";
  if (pathname === "/finance") return "Finance";
}

function Header() {
  const { pathname } = useRouter();

  return (
    <Flex className="py-[21.5px] px-6 border-b border-b-neutral-200">
      <p className="text-body-s font-medium text-neutral-800">
        {extractPageName(pathname)}
      </p>
    </Flex>
  );
}

export default Header;
