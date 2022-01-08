import React, { Fragment, useEffect, useState } from "react"
import { FaCalendarAlt } from "react-icons/fa"
import { AiOutlineHeart, AiFillHeart, AiOutlineShareAlt } from "react-icons/ai"

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

    useEffect(() => {
        setLiked(JSON.parse(localStorage.getItem("likes"))[image.url])
    }, [])

    useEffect(() => {
        const allLikedLS = localStorage.getItem("likes")

        // If allLiked does not exist in localstorage
        const allLiked = allLikedLS ? JSON.parse(allLikedLS) : {}

        allLiked[image.url] = liked

        localStorage.setItem("likes", JSON.stringify(allLiked))
    }, [liked])

    return (
        <section className="flex flex-col shadow-lg rounded-xl bg-slate-800">
            <figure>
                <img
                    src={image.url}
                    alt={image.title}
                    className="rounded-b-none shadow-md rounded-xl"
                />
                <figcaption className="p-4">
                    <h2 className="flex flex-col text-4xl font-semibold">
                        {image.title}
                    </h2>
                </figcaption>
            </figure>
            <div className="flex justify-between w-full gap-4 p-4 py-2 text-lg font-medium">
                <time dateTime={image.date} className="flex items-center gap-2">
                    <FaCalendarAlt />
                    {image.date}
                </time>
                <div className="text-right opacity-60">
                    {image.copyright ? (
                        <Fragment>{image.copyright}</Fragment>
                    ) : (
                        <Fragment>Public domain</Fragment>
                    )}
                </div>
            </div>
            {/* <hr className="self-center w-2/3 m-4 opacity-50" /> */}
            <div className="grid grid-cols-2 gap-2 m-4 my-2 text-lgw-max-full text-slate-900">
                <button
                    className={`flex items-center justify-center gap-2 p-3 font-semibold rounded-lg ${
                        liked ? "bg-pink-800 text-slate-200" : "bg-slate-300"
                    } transition-all `}
                    onClick={() => {
                        setLiked((prevState) => !prevState)
                    }}
                >
                    {liked ? <AiFillHeart /> : <AiOutlineHeart />}
                    Like
                </button>
                <button className="flex items-center justify-center gap-2 p-3 text-lg font-semibold rounded-lg bg-slate-300">
                    <AiOutlineShareAlt />
                    Share
                </button>
            </div>
            <div className="p-4 text-lg font-medium opacity-80">
                <p>{image.explanation}</p>
            </div>
        </section>
    )
}

export default ImageCard
