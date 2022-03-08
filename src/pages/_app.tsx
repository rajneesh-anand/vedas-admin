import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "react-toastify/dist/ReactToastify.css";
import "@assets/main.css";
import { UIProvider } from "@contexts/ui.context";

import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { useRef } from "react";

import { ReactQueryDevtools } from "react-query/devtools";
import { appWithTranslation } from "next-i18next";
import { ModalProvider } from "@components/ui/modal/modal.context";
import DefaultSeo from "@components/ui/default-seo";

import ManagedModal from "@components/ui/modal/managed-modal";

const Noop: React.FC = ({ children }) => <>{children}</>;

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const queryClientRef = useRef<any>(null);
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const Layout = (Component as any).Layout || Noop;

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <UIProvider>
          <ModalProvider>
            <>
              <DefaultSeo />
              <SessionProvider session={pageProps.session}>
                <Layout {...pageProps}>
                  <Component {...pageProps} />
                </Layout>
              </SessionProvider>
              <ToastContainer autoClose={2000} theme="colored" />
              <ManagedModal />
            </>
          </ModalProvider>
        </UIProvider>

        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default appWithTranslation(CustomApp);
