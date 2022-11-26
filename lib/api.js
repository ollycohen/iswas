import qs from "qs"
import { buildUrl } from "cloudinary-build-url"

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`
}

// export function getMediaURL(path = ""){
//   const url = buildUrl(path, {
//     cloud: {
//       cloudName: 'dhrlrjvax',
//     }
//   })
//   return url
// }

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    // method: "POST", // added this
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  }

  // Build request URL
  const queryString = qs.stringify(urlParamsObject)
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions)

  // Handle response
  if (!response.ok) {
    console.error(response.statusText)
    // throw new Error(`An error occured please try again`)
  }
  const data = await response.json()
  return data
}

export async function getIndexData() {
  const [categoriesRes, partsRes, homepageRes, backgroundRes] =
    await Promise.all([
      fetchAPI("/categories", { populate: "*" }),
      fetchAPI("/parts", { populate: "*" }),
      fetchAPI("/homepage", {
        populate: {
          hero: "*",
          seo: { populate: "*" },
        },
      }),
    ])
  return [categoriesRes, partsRes, homepageRes, backgroundRes]
}

export async function getCategories() {
  const categories = await fetchAPI("/categories", { populate: "*" })
  return categories
}

export async function getMatchingCategories(params) {
  const matchingCategories = await fetchAPI("/categories", {
    filters: { slug: params.slug },
    populate: {
      parts: {
        populate: "*",
      },
    },
  })
  return matchingCategories
}

export async function getBackgroundImage() {
  const backgroundImageData = await fetchAPI("/global", {
    populate: {
      backgroundImage: "*",
    },
  })
  return backgroundImageData
}

export async function getCategoryPaths() {
  const categoriesRes = await fetchAPI("/categories", { fields: ["slug"] })
  return categoriesRes
}

export async function getPartPath() {
  const partPath = await fetchAPI("/parts", { fields: ["slug"] })
  return partPath
}

export async function getPart(params) {
  const part = await fetchAPI("/parts", {
    filters: {
      slug: params.slug,
    },
    populate: "*",
  })
  return part
}

export async function getGlobal() {
  const globalRes = await fetchAPI("/global", {
    populate: {
      favicon: "*",
      defaultSeo: {
        populate: "*",
      },
    },
  })
  return globalRes
}
