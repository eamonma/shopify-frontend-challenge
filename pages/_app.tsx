import React from "react"
import { AppProps } from "next/app"

import "../styles/index.css"
import { AppContextProvider } from "../context/state"

function Spacestagram({ Component, pageProps }: AppProps) {
    return (
        <AppContextProvider>
            <Component {...pageProps} />
        </AppContextProvider>
    )
}

export default Spacestagram
