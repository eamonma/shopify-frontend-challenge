import { addDays, addWeeks, format } from "date-fns"
import {
    AnimatePresence,
    AnimateSharedLayout,
    motion,
    useReducedMotion,
} from "framer-motion"
import React, { useCallback, useEffect, useRef, useState } from "react"
import ImageCard, { NASAImage } from "../components/ImageCard"
import Layout from "../components/Layout"
import { useAppContext } from "../context/state"

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

        console.log(apiUrl)
        ;(async () => {
            const response = await (await fetch(apiUrl)).json()
            setLoading(true)

            try {
                setImages(response.reverse())
            } catch {
                alert("An error occured. Please try again.")
            }

            setLoading(false)
        })()
    }, [startDate])

    const handleScroll = () => {
        var isAtBottom =
            document.documentElement.scrollHeight -
                document.documentElement.scrollTop <=
            document.documentElement.clientHeight

        if (isAtBottom) {
            // Load next posts
            //   postNumber += postsPerPage;
            //   setPosts([...Array(postNumber).keys()]);
            // console.log("bottom")
            setStartDate(addWeeks(startDate, -1))
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
    }, [])

    return (
        <Layout title="Spacestagram | Home">
            <motion.main
                layout={!shouldReduceMotion}
                className="grid p-6 pt-0 items-start justify-center md:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6 grid-flow-dense bg-slate-900 overflow-scroll"
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
                            .filter(
                                (image) => !likedOnly || allLiked[image.url]
                            )
                            .map((image, i) => {
                                return (
                                    <ImageCard image={image} key={image.url} />
                                )
                            })

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
