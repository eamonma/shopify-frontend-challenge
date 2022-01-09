import Link from "next/link"
import React, { useState } from "react"
import Toggle from "react-toggle"
import "react-toggle/style.css"
import { useAppContext } from "../context/state"

const Nav = () => {
    const {
        state: { likedOnly },
        dispatch,
    } = useAppContext()

    return (
        <nav className="fixed z-10 flex items-center justify-between w-full p-4 shadow-md bg-slate-800">
            <div className="font-serif text-2xl font-medium tracking-wide uppercase md:text-4xl">
                Spacestagram
            </div>
            {/* <ul className="flex gap-4 font-medium md:gap-6">
                <li>
                    <Link href="/">All</Link>
                </li>
                <li>
                    <Link href="/liked">Liked</Link>
                </li>
            </ul> */}
            <div className="flex items-center gap-2">
                <Toggle
                    id="liked-only"
                    checked={likedOnly}
                    onChange={() =>
                        dispatch({
                            type: "SET_LIKED_ONLY",
                            payload: !likedOnly,
                        })
                    }
                />
                <label htmlFor="liked-only">Only liked</label>
            </div>
        </nav>
    )
}

export default Nav
