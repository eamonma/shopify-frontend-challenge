import { useReducedMotion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { Fragment, useCallback, useEffect, useState } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { BsArrowLeft } from "react-icons/bs"
import { FaCalendarAlt } from "react-icons/fa"
import { Controlled as ControlledZoom } from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"
import { NASAImage } from "../components/ImageCard"
import Layout from "../components/Layout"
import ShareButton from "../components/ShareButton"

const Image = () => {
    const router = useRouter()
    useEffect(() => {
        if (!router.isReady) return

        setDate(router.query["date"] as string)
    }, [router.isReady])

    const shouldReduceMotion = useReducedMotion()

    const [date, setDate] = useState<string>()
    const [image, setImage] = useState<NASAImage>()
    const [loading, setLoading] = useState(true)
    const [liked, setLiked] = useState(false)

    const [isZoomed, setIsZoomed] = useState(false)

    const handleZoomChange = useCallback((shouldZoom) => {
        setIsZoomed(shouldZoom)
    }, [])

    useEffect(() => {
        if (!date) return

        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API}&start_date=${date}&end_date=${date}`
        ;(async () => {
            const response = await (await fetch(apiUrl)).json()

            try {
                setImage(response[0])
            } catch {
                alert("An error occured. Please try again.")
            }
        })()
    }, [date])

    useEffect(() => {
        try {
            if (image)
                setLiked(JSON.parse(localStorage.getItem("likes"))[image.date])
        } catch {}
    }, [image])

    useEffect(() => {
        if (!image) return
        const allLikedLS = localStorage.getItem("likes")

        // If allLiked does not exist in localstorage
        const allLiked = allLikedLS ? JSON.parse(allLikedLS) : {}

        allLiked[image.date] = liked

        localStorage.setItem("likes", JSON.stringify(allLiked))
    }, [image, liked])

    useEffect(() => {
        if (image) setLoading(false)
    }, [image])

    return (
        <Layout
            title={image && `${image.title}: APOD ${image.date} - Spacestagram`}
            hideToggle
        >
            <Link href="/">
                <a className="flex p-4 pl-6 m-0 text-blue-300 w-fit group">
                    <span className="inline-flex items-center gap-2">
                        <BsArrowLeft /> Back
                    </span>
                </a>
            </Link>

            {!loading && (
                <main className="flex flex-col items-center w-full p-4 -mt-4 sm:p-6">
                    <div
                        className={`grid w-full max-w-6xl grid-cols-1 m-4 mb-12 shadow-lg md:grid-cols-2 rounded-xl bg-slate-800`}
                    >
                        <header className="">
                            <h1
                                className={`flex flex-col max-w-xl p-6 pb-2 text-5xl font-semibold not-sr-only md:text-7xl`}
                            >
                                {image.title}
                            </h1>

                            <div className="flex justify-between w-full gap-6 p-6 py-2 text-lg font-medium">
                                <time
                                    dateTime={image.date}
                                    className="flex items-center gap-2"
                                >
                                    <FaCalendarAlt />

                                    {image.date}
                                </time>
                                <div className="text-right opacity-90">
                                    {image.copyright ? (
                                        <Fragment>{image.copyright}</Fragment>
                                    ) : (
                                        <Fragment>Public domain</Fragment>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-center gap-4 p-6 py-2">
                                <button
                                    className={`flex-1 text-lg w-max-full flex items-center justify-center gap-2 p-3 rounded-lg ${
                                        liked
                                            ? "bg-pink-800 text-slate-200"
                                            : "bg-slate-300 text-slate-900"
                                    } hover:bg-opacity-90 transition-all`}
                                    onClick={() => {
                                        setLiked((prevState) => !prevState)
                                    }}
                                >
                                    {liked ? (
                                        <AiFillHeart />
                                    ) : (
                                        <AiOutlineHeart />
                                    )}

                                    {liked ? "Unlike" : "Like"}
                                </button>
                                <ShareButton image={image} />
                            </div>
                        </header>
                        <div className="relative w-full p-6 pt-4 text-lg font-medium max-w-prose opacity-80 ">
                            <p>{image.explanation}</p>
                        </div>
                    </div>
                    <figure className="relative flex justify-center w-full col-span-8 ">
                        {image.media_type === "image" ? (
                            <ControlledZoom
                                isZoomed={isZoomed}
                                onZoomChange={handleZoomChange}
                                overlayBgColorEnd="rgba(30, 41, 59, 0.9)"
                                overlayBgColorStart="rgba(30, 41, 59, 0)"
                            >
                                <img
                                    src={image.hdurl}
                                    alt={image.title}
                                    className={`w-screen shadow-md `}
                                />
                            </ControlledZoom>
                        ) : (
                            <div className="relative w-full h-full transition-all">
                                <iframe
                                    // width="420"
                                    // height="315"

                                    className="w-full h-screen transition-all"
                                    src={image.url}
                                ></iframe>
                            </div>
                        )}
                        <figcaption className="sr-only">
                            {image.title}
                        </figcaption>
                    </figure>
                </main>
            )}
        </Layout>
    )
}

export default Image
