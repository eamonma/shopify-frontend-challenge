import { AnimateSharedLayout } from "framer-motion"
import { AppProps } from "next/app"
import React from "react"
import { ToastContainer } from "react-toastify"
import { AppContextProvider } from "../context/state"
import "react-toastify/dist/ReactToastify.css"
import "../styles/index.css"

function Spacestagram({ Component, pageProps }: AppProps) {
    return (
        <AppContextProvider>
            <AnimateSharedLayout>
                <Component {...pageProps} />
            </AnimateSharedLayout>
            <ToastContainer
                hideProgressBar
                toastStyle={{
                    borderRadius: "10px",
                }}
            />
        </AppContextProvider>
    )
}

export default Spacestagram
