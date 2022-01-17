# Spacestagram - Shopify Front End Developer Intern Challenge

> A webpage that can pull images, and allow the user to “like” and “unlike” their favourite images.

For the 2022 summer Shopify [Front End Developer Intern Challenge](https://docs.google.com/document/d/13zXpyrC2yGxoLXKktxw2VJG2Jw8SdUfliLM-bYQLjqE/edit).

## Features

-   View both photos and embeddable videos
-   Share individual APODs
-   Activate the iOS and Android share sheet when sharing from a browser that supports `navigator.share()`
-   Custom API caching
-   Today marker to indicate today's APOD
-   "Infinite scroll" with load more button instead of pagination or date picker
-   Persist likes across full page refresh
-   Full screen image viewer

## Development

Clone the repository, then run:

```properties
npm install
npm run dev
```

View the development server at https://localhost:3000.

## Known issues

-   The APOD API does not format the author's name correctly as it appears on the official website.
-   The APOD API does not respond with rich descriptions (e.g. with links to related topics) as it does on the official website.
-   The APOD API does not distinguish between the image description and date-related information like "Tonight: APOD Editor to Present the Best Space Images of 2021" on the 2022 January 11 APOD.
-   The APOD API does not respond with interactive media and gives no information regarding it like [the 2022 January 11 APOD](https://apod.nasa.gov/apod/ap220111.html) where there is an alternate image on hover.
-   "Only show liked" does not show pictures that have not been loaded; e.g. if 2022-01-20 to 2022-01-14 have been loaded, and 2022-01-01 was liked, it will not appear.
-   Scroll location and already loaded images on browser back is not persisted.

## Stack

Next.js (React), TypeScript, Tailwind, deployed on Netlify.
