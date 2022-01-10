import React, { ReactNode } from "react"
import Link from "next/link"
import Head from "next/head"
import Nav from "./Nav"
import { AppContextProvider } from "../context/state"

type Props = {
    children?: ReactNode
    title?: string
    hideToggle?: boolean
}

const Layout = ({
    children,
    title = "Spacestagram",
    hideToggle = false,
}: Props) => (
    <div className="min-h-screen bg-slate-900 text-slate-200">
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
        </Head>
        <header>
            <Nav hideToggle={hideToggle} />
        </header>
        <div className="relative top-20 bg-slate-900 text-slate-200">
            {children}
        </div>
    </div>
)

export default Layout
