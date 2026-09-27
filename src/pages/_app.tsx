import { Container, Header, Sidebar } from "@/components/custom";
import { Flex } from "@/components/shared";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <Container className="flex-row!">
      {pathname !== "/login" && <Sidebar />}

      <Flex className="flex-1 overflow-hidden">
        <Header />
        <Component {...pageProps} />
      </Flex>
    </Container>
  );
}
