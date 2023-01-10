import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    });
  });
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/search-problem.png" />
        <title>show me the issues</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} position={"top-left"} />
      </QueryClientProvider>
    </>
  );
}
