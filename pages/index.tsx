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
    // const [apiUrl, setApiUrl] = useState(
    //     `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API}&start_date=2022-01-01`
    // )

    const [startDate, setStartDate] = useState(addWeeks(new Date(), -1))
    const [images, setImages] = useState<Array<NASAImage>>([])
    const [loading, setLoading] = useState(false)

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

        // setImages([
        //     {
        //         copyright: "Soumyadeep Mukherjee",
        //         date: "2022-01-01",
        //         explanation:
        //             "very Full Moon of 2021 shines in this year-spanning astrophoto project, a composite portrait of the familiar lunar nearside at each brightest lunar phase. Arranged by moonth, the year progresses in stripes beginning at the top. Taken with the same camera and lens the stripes are from Full Moon images all combined at the same pixel scale. The stripes still look mismatched, but they show that the Full Moon's angular size changes throughout the year depending on its distance from Kolkata, India, planet Earth. The calendar month, a full moon name, distance in kilometers, and angular size is indicated for each stripe. Angular size is given in minutes of arc corresponding to 1/60th of a degree. The largest Full Moon is near a perigee or closest approach in May. The smallest is near an apogee, the most distant Full Moon in December. Of course the full moons of May and November also slid into Earth's shadow during 2021's two lunar eclipses.",
        //         hdurl: "https://apod.nasa.gov/apod/image/2201/MoonstripsAnnotatedIG.jpg",
        //         media_type: "image",
        //         service_version: "v1",
        //         title: "The Full Moon of 2021",
        //         url: "https://apod.nasa.gov/apod/image/2201/MoonstripsAnnotatedIG_crop1024.jpg",
        //     },
        //     {
        //         copyright: "Dani Caxete",
        //         date: "2022-01-02",
        //         explanation:
        //             "Sometimes falling ice crystals make the atmosphere into a giant lens causing arcs and halos to appear around the Sun or Moon. One Saturday night in 2012 was just such a time near Madrid, Spain, where a winter sky displayed not only a bright Moon but four rare lunar halos.  The brightest object, near the top of the featured image, is the Moon. Light from the Moon refracts through tumbling hexagonal ice crystals into a somewhat rare 22-degree halo seen surrounding the Moon. Elongating the 22-degree arc horizontally is a more rare circumscribed halo caused by column ice crystals. Even more rare, some moonlight refracts through more distant tumbling ice crystals to form a (third) rainbow-like arc 46 degrees from the Moon and appearing here just above a picturesque winter landscape. Furthermore, part of a whole 46-degree circular halo is also visible, so that an extremely rare -- especially for the Moon --  quadruple halo  was captured. Far in the background is a famous winter skyscape that includes Sirius, the belt of Orion, and Betelgeuse -- visible between the inner and outer arcs. Halos and arcs typically last for minutes to hours, so if you do see one there should be time to invite family, friends or neighbors to share your unusual lensed vista of the sky.",
        //         hdurl: "https://apod.nasa.gov/apod/image/2201/lunararcs_caxete_1280.jpg",
        //         media_type: "image",
        //         service_version: "v1",
        //         title: "Quadruple Lunar Halo Over Winter Road",
        //         url: "https://apod.nasa.gov/apod/image/2201/lunararcs_caxete_960.jpg",
        //     },
        //     {
        //         copyright: "Jan Hattenbach",
        //         date: "2022-01-03",
        //         explanation:
        //             "You couldn't see Comet Leonard’s extremely long tail with a telescope — it was just too long. You also couldn't see it with binoculars — still too long. Or with your eyes -- it was too dim. Or from a city — the sky was too bright. But from a dark location with a low horizon — your camera could. And still might -- if the comet survives today's closest encounter with the Sun, which occurs between the orbits of Mercury and Venus. The featured picture was created from two deep and wide-angle camera images taken from La Palma in the Canary Islands of Spain late last month.  Afterwards, if it survives, what is left of Comet Leonard's nucleus will head out of our Solar System, never to return.",
        //         hdurl: "https://apod.nasa.gov/apod/image/2201/LeonardTail_Hattenbach_1600.jpg",
        //         media_type: "image",
        //         service_version: "v1",
        //         title: "Comet Leonard's Long Tail",
        //         url: "https://apod.nasa.gov/apod/image/2201/LeonardTail_Hattenbach_960.jpg",
        //     },
        //     {
        //         date: "2022-01-04",
        //         explanation:
        //             "What's happened to that moon of Saturn? Nothing -- Saturn's moon Rhea is just partly hidden behind Saturn's rings. In 2010, the robotic Cassini spacecraft then orbiting Saturn took this narrow-angle view looking across the Solar System's most famous rings. Rings visible in the foreground include the thin F ring on the outside and the much wider A and B rings just interior to it. Although it seems to be hovering over the rings, Saturn's moon Janus is actually far behind them.  Janus is one of Saturn's smaller moons and measures only about 180 kilometers across. Farther out from the camera is the heavily cratered Rhea, a much larger moon measuring 1,500 kilometers across. The top of Rhea is visible only through gaps in the rings. After more than a decade of exploration and discovery, the Cassini spacecraft ran low on fuel in 2017 and was directed to enter Saturn's atmosphere, where it surely melted.   Explore Your Universe: Random APOD Generator",
        //         hdurl: "https://apod.nasa.gov/apod/image/2201/RheaJanus_Cassini_1020.jpg",
        //         media_type: "image",
        //         service_version: "v1",
        //         title: "Moons Beyond Rings at Saturn",
        //         url: "https://apod.nasa.gov/apod/image/2201/RheaJanus_Cassini_1020.jpg",
        //     },
        //     {
        //         copyright: "Luca Vanzella",
        //         date: "2022-01-05",
        //         explanation:
        //             "Does the Sun always rise in the same direction?  No.  As the months change, the direction toward the rising Sun changes, too.  The featured image shows the direction of sunrise every month during 2021 as seen from the city of Edmonton, Alberta, Canada. The camera in the image is always facing due east, with north toward the left and south toward the right.  As shown in an accompanying video, the top image was taken in 2020 December, while the bottom image was captured in 2021 December, making 13 images in total. Although the Sun always rises in the east in general, it rises furthest to the south of east near the December solstice, and furthest north of east near the June solstice. In many countries, the December Solstice is considered an official change in season: for example the first day of winter in the North.  Solar heating and stored energy in the Earth's surface and atmosphere are near their lowest during winter, making the winter season the coldest of the year.    Status Updates: Deploying the James Webb Space Telescope",
        //         hdurl: "https://apod.nasa.gov/apod/image/2201/SunriseYear_Vanzella_2400.jpg",
        //         media_type: "image",
        //         service_version: "v1",
        //         title: "A Year of Sunrises",
        //         url: "https://apod.nasa.gov/apod/image/2201/SunriseYear_Vanzella_960.jpg",
        //     },
        //     {
        //         copyright: "Tamas Ladanyi",
        //         date: "2022-01-06",
        //         explanation:
        //             "That's not a young crescent Moon posing behind cathedral towers after sunset. It's Venus in a crescent phase. About 40 million kilometers away and about 2 percent illuminated by sunlight, it was captured with camera and telephoto lens in this series of exposures as it set in western skies on January 1 from Veszprem, Hungary. The bright celestial beacon was languishing in the evening twilight, its days as the Evening Star coming to a close as 2022 began. But it was also growing larger in apparent size and becoming an ever thinner crescent in telescopic views. Heading toward a (non-judgemental) inferior conjunction, the inner planet will be positioned between Earth and Sun on January 9 and generally lost from view in the solar glare. A crescent Venus will soon reappear though. Rising in the east by mid-month just before the Sun as the brilliant Morning Star.   Status Updates: Deploying the James Webb Space Telescope",
        //         hdurl: "https://apod.nasa.gov/apod/image/2201/venus_220101_ladanyi_web.jpg",
        //         media_type: "image",
        //         service_version: "v1",
        //         title: "The Last Days of Venus as the Evening Star",
        //         url: "https://apod.nasa.gov/apod/image/2201/venus_220101_ladanyi_web1024.jpg",
        //     },
        //     {
        //         copyright: "Point Blue Conservation Science",
        //         date: "2022-01-07",
        //         explanation:
        //             "A male Adelie penguin performed this Ecstatic Vocalization in silhouette during the December 4 solar eclipse, the final eclipse of 2021. Of course his Ecstatic Vocalization is a special display that male penguins use to claim their territory and advertise their condition. This penguin's territory, at Cape Crozier Antarctica, is located in one of the largest Adelie penguin colonies. The colony has been studied by researchers for over 25 years. From there, last December's eclipse was about 80 percent total when seen at its maximum phase as the Moon's shadow crossed planet Earth's southernmost continent.   Status Updates: Deploying the James Webb Space Telescope",
        //         hdurl: "https://apod.nasa.gov/apod/image/2201/eclipse_EV.jpg",
        //         media_type: "image",
        //         service_version: "v1",
        //         title: "Ecstatic Solar Eclipse",
        //         url: "https://apod.nasa.gov/apod/image/2201/eclipse_EV1024.jpg",
        //     },
        //     {
        //         copyright: "Cheng Luo",
        //         date: "2022-01-08",
        //         explanation:
        //             "Named for a forgotten constellation, the Quadrantid Meteor Shower puts on an annual show for planet Earth's northern hemisphere skygazers. The shower's radiant on the sky lies within the old, astronomically obsolete constellation Quadrans Muralis. That location is not far from the Big Dipper, at the boundaries of the modern constellations Bootes and Draco. In fact north star Polaris is just below center in this frame and the Big Dipper asterism (known to some as the Plough) is above it, with the meteor shower radiant to the right. Pointing back toward the radiant, Quadrantid meteors streak through the night in the panoramic skyscape, a composite of images taken in the hours around the shower's peak on January 4, 2022. Arrayed in the foreground are radio telescopes of the Chinese Spectral Radioheliograph, Mingantu Observing Station, Inner Mongolia, China. A likely source of the dust stream that produces Quadrantid meteors was identified in 2003 as an asteroid.   Status Updates: Deploying the James Webb Space Telescope",
        //         hdurl: "https://apod.nasa.gov/apod/image/2201/QuadrantidsnorthernskyRadioTelescopeArray.jpg",
        //         media_type: "image",
        //         service_version: "v1",
        //         title: "Quadrantids of the North",
        //         url: "https://apod.nasa.gov/apod/image/2201/QuadrantidsnorthernskyRadioTelescopeArray1024.jpg",
        //     },
        // ])
    }, [startDate])

    return (
        <Layout title="Spacestagram | Home">
            <motion.main
                layout={!shouldReduceMotion}
                className="grid px-6 items-start md:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-6 grid-flow-dense bg-slate-900"
            >
                <AnimateSharedLayout>
                    {(() => {
                        if (typeof window === "undefined") return

                        const allLikedLS = localStorage.getItem("likes")

                        // If allLiked does not exist in localstorage
                        const allLiked = allLikedLS
                            ? JSON.parse(allLikedLS)
                            : {}

                        return [...images].reverse().map((image) => {
                            if (likedOnly && !allLiked[image.url]) return

                            return <ImageCard image={image} key={image.url} />
                        })
                    })()}
                </AnimateSharedLayout>
            </motion.main>
            {loading && <span className="p-4">Loading...</span>}
        </Layout>
    )
}

export default IndexPage
