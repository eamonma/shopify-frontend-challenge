import React from "react"
import { AiOutlineShareAlt } from "react-icons/ai"
import { cssTransition, toast } from "react-toastify"
import { NASAImage } from "./ImageCard"

export const fade = cssTransition({
    enter: "animate__animated animate__fadeIn",
    exit: "animate__animated animate__fadeOut",
})

const ShareButton = ({ image }: { image: NASAImage }) => {
    const notify = () =>
        toast.dark(`Copied ${image.date} APOD link to clipboard.`, {
            transition: fade,
        })

    return (
        <button
            className={`flex items-center justify-center flex-1 gap-2 p-3 text-lg transition-all rounded-lg w-max-full bg-slate-300 text-slate-900 hover:bg-opacity-90`}
            onClick={() => {
                const url = `${window.location.protocol}//${
                    window.location.hostname
                }${
                    window.location.port !== "80" && `:${window.location.port}`
                }/${image.date}`

                if (navigator.share) {
                    navigator
                        .share({
                            title: `APOD ${image.date}`,
                            text: `${image.title}`,
                            url,
                        })
                        .then(() => {})
                        .catch(console.error)
                } else {
                    // fallback
                    navigator.clipboard.writeText(url)
                    notify()
                }
            }}
        >
            <AiOutlineShareAlt />
            Share
        </button>
    )
}

export default ShareButton
