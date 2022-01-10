import { isSameDay } from "date-fns"
import { zonedTimeToUtc } from "date-fns-tz"
import { motion, useReducedMotion } from "framer-motion"
import Link from "next/link"
import React, { Fragment, useCallback, useEffect, useState } from "react"
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai"
import { BsArrowRight } from "react-icons/bs"
import { FaCalendarAlt } from "react-icons/fa"
import { Controlled as ControlledZoom } from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"
import { cssTransition, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "animate.css/animate.min.css"
import ShareButton from "./ShareButton"

export interface NASAImage {
    resource?: string
    title: string
    date: string
    url: string
    hdurl?: string
    media_type: "image" | "video"
    explanation: string
    thumbnail_url?: string
    copyright?: string
    service_version: string
}

const ImageCard = ({ image }: { image: NASAImage }) => {
    const [liked, setLiked] = useState(false)
    const shouldReduceMotion = useReducedMotion()

    useEffect(() => {
        try {
            setLiked(JSON.parse(localStorage.getItem("likes"))[image.date])
        } catch {}
    }, [])

    useEffect(() => {
        const allLikedLS = localStorage.getItem("likes")

        // If allLiked does not exist in localstorage
        const allLiked = allLikedLS ? JSON.parse(allLikedLS) : {}

        allLiked[image.date] = liked

        localStorage.setItem("likes", JSON.stringify(allLiked))
    }, [liked])

    const [isZoomed, setIsZoomed] = useState(false)

    const handleImgLoad = useCallback(() => {
        setIsZoomed(true)
    }, [])

    const handleZoomChange = useCallback((shouldZoom) => {
        setIsZoomed(shouldZoom)
    }, [])

    const imageIsToday = isSameDay(
        new Date(image.date),
        zonedTimeToUtc(new Date(), "UTC")
    )

    return (
        <motion.section
            layout={shouldReduceMotion ? false : "position"}
            key={image.url}
            layoutId={image.date + "-card"}
            className={`flex flex-col shadow-lg rounded-xl bg-slate-800`}
        >
            <figure>
                {image.media_type === "image" ? (
                    <ControlledZoom
                        isZoomed={isZoomed}
                        onZoomChange={handleZoomChange}
                        overlayBgColorEnd="rgba(30, 41, 59, 0.9)"
                        overlayBgColorStart="rgba(30, 41, 59, 0)"
                    >
                        <img
                            src={image.url}
                            alt={image.title}
                            className={`w-full rounded-b-none shadow-md ${
                                !isZoomed && "rounded-xl"
                            }`}
                        />
                    </ControlledZoom>
                ) : (
                    <div className="relative pb-[56.25%] transition-all">
                        <iframe
                            // width="420"
                            // height="315"

                            className="absolute top-0 left-0 w-full h-full transition-all rounded-b-none rounded-xl"
                            src={image.url}
                        ></iframe>
                    </div>
                )}
                <figcaption className="p-6 pb-2">
                    <motion.h2
                        layout={!shouldReduceMotion}
                        layoutId={image.date + "-title"}
                        className={`flex flex-col text-4xl font-semibold`}
                    >
                        {image.title}
                    </motion.h2>
                </figcaption>
            </figure>
            <div className="flex justify-between w-full gap-6 p-6 py-2 text-lg font-medium">
                <time dateTime={image.date} className="flex items-center gap-2">
                    <FaCalendarAlt />
                    {imageIsToday && (
                        <span className="text-orange-300">Today,</span>
                    )}
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
            <div className="flex gap-4 m-6 my-2">
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
                    {liked ? <AiFillHeart /> : <AiOutlineHeart />}

                    {liked ? "Unlike" : "Like"}
                </button>
                <ShareButton image={image} />
            </div>

            <div className="relative p-4 pt-4 pb-2 text-lg font-medium sm:p-6 opacity-80">
                <p className="line-clamp-5">{image.explanation}</p>
                <Link href={`/${image.date}`}>
                    <a className="flex flex-row-reverse w-full p-4 pr-0 text-blue-300 group">
                        <span className="inline-flex items-center gap-2">
                            Read more{" "}
                            <BsArrowRight className="relative transition top-[1px] group-hover:translate-x-1" />
                        </span>
                    </a>
                </Link>
            </div>
        </motion.section>
    )
}

export default ImageCard
