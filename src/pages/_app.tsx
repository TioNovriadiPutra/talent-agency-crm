import {
  AuthInitializer,
  Container,
  Header,
  Sidebar,
  TalentFormModal,
  Toast,
} from "@/components/custom";
import { Flex } from "@/components/shared";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            retry: 1,
          },
          mutations: {
            retry: false,
          },
        },
      }),
  );

  const { pathname } = useRouter();

  return (
    <Container className="flex-row!">
      <QueryClientProvider client={queryClient}>
        <AuthInitializer />

        {pathname !== "/login" && <Sidebar />}

        <Flex className="flex-1 overflow-hidden relative">
          {pathname !== "/login" && <Header />}

          <Component {...pageProps} />

          <Toast />
        </Flex>

        <TalentFormModal />
      </QueryClientProvider>
    </Container>
  );
}
