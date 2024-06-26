import React from "react";
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Head from "next/head";

import "../styles/paper.min.css";
import "../styles/tailwind.css";
import "../styles/reset.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </Head>

      <RecoilRoot>
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}

export default App;
