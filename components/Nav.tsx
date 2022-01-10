import Link from "next/link"
import React, { useState } from "react"
import Toggle from "react-toggle"
import "react-toggle/style.css"
import { useAppContext } from "../context/state"

const Nav = ({ hideToggle }: { hideToggle: boolean }) => {
    const {
        state: { likedOnly },
        dispatch,
    } = useAppContext()

    return (
        <nav className="fixed z-10 flex items-center justify-between w-full h-16 p-4 shadow-md bg-slate-800">
            <Link href="/">
                <a className="font-serif text-2xl font-medium tracking-wide uppercase md:text-3xl">
                    Spacestagram
                </a>
            </Link>

            {!hideToggle && (
                <div className="flex items-center gap-2">
                    <label htmlFor="liked-only" className="font-semibold">
                        Only show liked
                    </label>
                    <Toggle
                        id="liked-only"
                        checked={likedOnly}
                        onChange={() => {
                            dispatch({
                                type: "SET_LIKED_ONLY",
                                payload: !likedOnly,
                            })

                            window.scrollTo(0, 0)
                        }}
                    />
                </div>
            )}
        </nav>
    )
}

export default Nav
