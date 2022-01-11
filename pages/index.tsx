import { addDays, addWeeks } from "date-fns"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import React, { Fragment, useCallback, useEffect, useState } from "react"
import { SpinnerCircular } from "spinners-react"
import fetchImages, { getISODateFromDate } from "../components/fetchImages"
import ImageCard, { NASAImage } from "../components/ImageCard"
import Layout from "../components/Layout"
import { useAppContext } from "../context/state"

const IndexPage = () => {
    const [endDate, setEndDate] = useState(new Date())
    const [images, setImages] = useState<Array<NASAImage>>([])
    const [loading, setLoading] = useState(true)
    const shouldReduceMotion = useReducedMotion()

    const {
        state: { likedOnly },
    } = useAppContext()

    const getImages = useCallback(
        (startDate: Date, endDate: Date, currImages: Array<NASAImage>) => {
            // if (firstUpdate.current) return
            ;(async () => {
                setLoading(true)

                try {
                    const response = await fetchImages(
                        getISODateFromDate(startDate),
                        getISODateFromDate(endDate)
                    )

                    const totalImages = [...currImages, ...response.reverse()]

                    setImages(totalImages)
                } catch (error) {
                    alert("An error occured. Please try again.")
                    console.log(error)
                }

                setLoading(false)
            })()
        },
        []
    )

    useEffect(() => {
        const startDate = addWeeks(endDate, -1)

        getImages(startDate, endDate, images)
    }, [endDate])

    return (
        <Layout title="Spacestagram | Home">
            <motion.main
                layout={!shouldReduceMotion}
                className="grid sm:p-6 p-4 sm:pt-0 pt-12 items-start justify-center md:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6 grid-flow-dense bg-slate-900 overflow-scroll"
            >
                <AnimatePresence>
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
                </AnimatePresence>
            </motion.main>
            {!likedOnly && (
                <div className="relative flex items-center justify-center p-2 py-6 -top-4">
                    <button
                        disabled={process.browser ? loading : true}
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
