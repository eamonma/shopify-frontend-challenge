import { addDays, addWeeks, format } from "date-fns"
import {
    AnimatePresence,
    AnimateSharedLayout,
    motion,
    useReducedMotion,
} from "framer-motion"
import React, {
    Fragment,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react"
import ImageCard, { NASAImage } from "../components/ImageCard"
import Layout from "../components/Layout"
import { useAppContext } from "../context/state"
import { SpinnerCircular } from "spinners-react"

const IndexPage = () => {
    const [endDate, setEndDate] = useState(new Date())
    const [images, setImages] = useState<Array<NASAImage>>([])
    const [loading, setLoading] = useState(true)
    const shouldReduceMotion = useReducedMotion()

    const {
        state: { likedOnly },
    } = useAppContext()

    const fetchImages = useCallback((startDate, endDate, currImages) => {
        const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${
            process.env.NEXT_PUBLIC_NASA_API
        }&start_date=${format(startDate, "yyyy-MM-dd")}&end_date=${format(
            endDate,
            "yyyy-MM-dd"
        )}`
        ;(async () => {
            const response = await (await fetch(apiUrl)).json()
            setLoading(true)

            try {
                setImages([...currImages, ...response.reverse()])
            } catch {
                alert("An error occured. Please try again.")
            }

            setLoading(false)
        })()
    }, [])

    useEffect(() => {
        const startDate = addWeeks(endDate, -1)

        fetchImages(startDate, endDate, images)
    }, [endDate])

    return (
        <Layout title="Spacestagram | Home">
            <motion.main
                layout={!shouldReduceMotion}
                className="grid sm:p-6 p-4 pt-0 items-start justify-center md:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6 grid-flow-dense bg-slate-900 overflow-scroll"
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
                                (image) => !likedOnly || allLiked[image.date]
                            )
                            .map((image, i) => {
                                return (
                                    <ImageCard image={image} key={image.url} />
                                )
                            })

                        if (likedOnly && !imagesToShow.length && !loading)
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
            {!likedOnly && (
                <div className="relative flex items-center justify-center p-2 -top-4">
                    <button
                        disabled={loading}
                        className="flex items-center gap-2 p-2 px-4 text-lg rounded-lg bg-slate-300 text-slate-900 hover:opacity-90 disabled:opacity-80 disabled:cursor-not-allowed"
                        onClick={() => {
                            setLoading(true)
                            setEndDate(addDays(addWeeks(endDate, -1), -1))
                        }}
                    >
                        {loading ? (
                            <Fragment>
                                Loading{" "}
                                <SpinnerCircular
                                    color="#fff"
                                    size={20}
                                    thickness={170}
                                    speed={150}
                                />
                            </Fragment>
                        ) : (
                            "Load more"
                        )}
                    </button>
                </div>
            )}
        </Layout>
    )
}

export default IndexPage
