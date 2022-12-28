import { getStrapiMedia, getCloudinaryImage } from "../lib/media"
import Image from "next/image"

const Coverphoto = ({ part, style }) => {
  let data = {
    url: "",
    alternativeText: "",
    width: 100,
    height: 100,
  }

  const { text } = part.attributes

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
  if (!data.url) {
    return <div className="uk-margin-bottom">{text}</div>
  } else {
    return (
      <Image
        width={data.width}
        height={data.width}
        src={data.url}
        alt={data.alternativeText}
      />
    )
  }
}

export default Coverphoto
