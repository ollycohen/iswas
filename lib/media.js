import { getStrapiURL } from "./api"

export function getStrapiMedia(media) {
  const { url } = media.data.attributes
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url
  return imageUrl
}


export function getStrapiMultimedia(media) {
  const { url } = media.data[0].attributes
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url
  return imageUrl
}

export function getStrapiImage(data){
  const { url } = data
  const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url
  return imageUrl
}