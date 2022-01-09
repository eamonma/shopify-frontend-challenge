import { addWeeks, format } from "date-fns"
import {
    AnimatePresence,
    AnimateSharedLayout,
    motion,
    useReducedMotion,
} from "framer-motion"
import React, { useEffect, useState } from "react"
import ImageCard, { NASAImage } from "../components/ImageCard"
import Layout from "../components/Layout"
import { useAppContext } from "../context/state"

const ConditionalWrapper = ({ condition, wrapper, children }) =>
    condition ? wrapper(children) : children

const IndexPage = () => {
    const [startDate, setStartDate] = useState(addWeeks(new Date(), -1))
    const [images, setImages] = useState<Array<NASAImage>>([])
    const [loading, setLoading] = useState(true)

    const shouldReduceMotion = useReducedMotion()

    const {
        state: { likedOnly },
    } = useAppContext()

    useEffect(() => {
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${
            process.env.NEXT_PUBLIC_NASA_API
        }&start_date=${format(startDate, "yyyy-MM-dd")}`

        ;(async () => {
            setLoading(true)
            setImages(await (await fetch(apiUrl)).json())
            setLoading(false)
        })()
    }, [startDate])

    return (
        <Layout title="Spacestagram | Home">
            <motion.main
                layout={!shouldReduceMotion}
                className="grid p-6 pt-0 items-start md:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6 grid-flow-dense bg-slate-900"
            >
                <AnimateSharedLayout>
                    {(() => {
                        if (typeof window === "undefined") return

                        const allLikedLS = localStorage.getItem("likes")

                        // If allLiked does not exist in localstorage
                        const allLiked = allLikedLS
                            ? JSON.parse(allLikedLS)
                            : {}

                        const imagesToShow = [...images]
                            .reverse()
                            .filter(
                                (image) => !likedOnly || allLiked[image.url]
                            )
                            .map((image) => {
                                return (
                                    <ImageCard image={image} key={image.url} />
                                )
                            })

                        console.log(imagesToShow)

                        if (!imagesToShow.length && !loading)
                            return (
                                <motion.div
                                    layout="position"
                                    className="p-4 pt-0"
                                >
                                    There are no liked images.
                                </motion.div>
                            )

                        return imagesToShow
                    })()}
                </AnimateSharedLayout>
            </motion.main>
            {loading && <div className="relative p-4 -top-8">Loading...</div>}
        </Layout>
    )
}

export default IndexPage
