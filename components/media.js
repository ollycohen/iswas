import Image from "./image"
import ReactPlayer from "react-player"
import { getStrapiURL } from "../lib/api"

const Media = ({ media, style }) => {
  return (
    <div className="uk-container">
      {media.map((medium, i) => {
        const { mime } = medium.attributes
        if (mime.includes("image")) {
          return (
            <div className="uk-container">
              <Image alt={"image"} key={i} image={medium} />
              <br />
            </div>
          )
        } else if (mime.includes("video")) {
          return (
            <div className="uk-flex uk-flex-center">
              <ReactPlayer
                key={i}
                url={getStrapiURL(medium.attributes.url)}
                controls={true}
              />
              <br />
            </div>
          )
        }
      })}
    </div>
  )
}

export default Media
