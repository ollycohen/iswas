import { getStrapiMedia, getCloudinaryImage } from "../lib/media"
import NextImage from "next/image"

const Coverphoto = ({ part, style }) => {
  let data = {
    url: "",
    alternativeText: "",
    width: "100%",
    height: "100%",
  }

  if (part.attributes.thumbnail.data != null) {
    data = part.attributes.thumbnail.data.attributes
  } else {
    part.attributes.media.data?.every((value, index) => {
      if (value.attributes.mime.includes("image")) {
        data = value.attributes
        return
      }
    })
  }

  return (
    <NextImage
      // loader={loader}
      layout="responsive"
      width={data.width}
      height={data.width}
      objectFit="contain"
      src={data.url}
      alt={data.alternativeText}
    />
  )
}

export default Coverphoto
