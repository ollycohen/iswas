import NextImage from "next/image"
import { getStrapiURL } from "../lib/api"

const Image = ({ image, style }) => {
  const { url, alternativeText, width, height } = image.attributes

  // const loader = () => {
  //   return getStrapiMedia(image)
  // }

  return (
    <NextImage
      // loader={loader}
      layout="responsive"
      width="50%"
      height="50%"
      // objectFit="contain"
      src={getStrapiURL(url)}
      alt={alternativeText || ""}
    />
  )
}


export default Image

