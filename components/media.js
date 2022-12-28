import { Autour_One } from "@next/font/google"
import Image from "next/image"
import ReactPlayer from "react-player"
import { getStrapiURL } from "../lib/api"

const Media = ({ media, style }) => {
  return (
    <div className="uk-container">
      {media.map((medium, i) => {
        const { mime, url } = medium.attributes
        if (mime.includes("image")) {
          const { url, alternativeText, width, height } = medium.attributes
          return (
            <div className="uk-container" key={i}>
              <Image
                layout="responsive"
                width={width}
                height={height}
                src={url}
                alt={alternativeText || ""}
                style={{
                  paddingBottom: "10%",
                  paddingLeft: "10%",
                  paddingRight: "10%",
                }}
              />
              <br />
            </div>
          )
        } else if (mime.includes("video")) {
          return (
            <div className="uk-flex uk-flex-center" key={i}>
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
