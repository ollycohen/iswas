import { getStrapiMedia, getStrapiImage } from "../lib/media"
import NextImage from "next/image"

const Coverphoto = ({ part, style }) => {

    
    let data = {
        url : "",
        alternativeText: "",
        width: "100%",
        height: "100%"
    }

    if (part.attributes.thumbnail.data != null){
       data = part.attributes.thumbnail.data.attributes
        
    } else {
        let foundImage = false
        part.attributes.media.data.every( (value, index) => {
            if (value.attributes.mime.includes("image")){
                data = value.attributes
                foundImage = true
                return false
            }
            return true
        })
    }


  // const loader = () => {
  //   return getStrapiMedia(image)
  // }

  return (
    <NextImage
      // loader={loader}
      layout="responsive"
      width={data.width}
      height={data.width}
      objectFit="contain"
      src={getStrapiImage(data)}
      alt={data.alternativeText}
    />
  )
}


export default Coverphoto

