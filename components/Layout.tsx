import React, { ReactNode } from "react"
import Link from "next/link"
import Head from "next/head"
import Nav from "./Nav"

type Props = {
    children?: ReactNode
    title?: string
}

const Layout = ({ children, title = "Spacestagram" }: Props) => (
    <div className="bg-slate-900 text-slate-200">
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
        </Head>
        <header>
            <Nav />
        </header>
        <div className="relative top-24 bg-slate-900 text-slate-200">
            {children}
        </div>
        {/* <footer>
            <hr />
            <span>I'm here to stay (Footer)</span>
        </footer> */}
    </div>
)

export default Layout
