import { useRouter } from "next/router";
import { Flex } from "../shared";
import { ParsedUrlQuery } from "querystring";

function extractPageName(pathname: string, query: ParsedUrlQuery) {
  const breadcrumb = [];

  if (pathname === "/") breadcrumb.push("Dashboard");
  if (pathname.includes("/pipeline")) breadcrumb.push("Pipeline Deal");
  if (pathname.includes("/talent")) breadcrumb.push("Talent");
  if (pathname.includes("/finance")) breadcrumb.push("Finance");
  if (pathname.includes("/deal")) {
    breadcrumb.push("Deal");

    if (pathname.includes("/new")) {
      breadcrumb.push("Inquiry Baru");
    }

    if (query.name) {
      breadcrumb.push(query.name);
    }
  }

  console.log(query);

  return breadcrumb;
}

function Header() {
  const { pathname, query } = useRouter();

  const breadcrumbs = extractPageName(pathname, query);

  return (
    <Flex className="flex-row! items-center py-[21.5px] px-6 border-b border-b-neutral-300 gap-2 bg-white">
      {breadcrumbs.map((item, index) => (
        <Flex key={index.toString()} className="flex-row! items-center gap-2">
          <p className="text-body-s font-medium text-neutral-800">{item}</p>

          {index < breadcrumbs.length - 1 && (
            <Flex className="size-1 rounded-full bg-neutral-300" />
          )}
        </Flex>
      ))}
    </Flex>
  );
}

export default Header;
