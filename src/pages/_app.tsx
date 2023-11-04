import React from "react";
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

import "../styles/tailwind.css";
import "../styles/paper.min.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default App;
