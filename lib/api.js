import qs from "qs"

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
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
    throw new Error(`An error occured please try again`)
  }
  const data = await response.json()
  return data
}

export async function getIndexData() {
  const [categoriesRes, partsRes, homepageRes] = await Promise.all([
    fetchAPI("/categories", { populate: "*" }),
    fetchAPI("/parts", { populate: "*" }),
    fetchAPI("/homepage", {
      populate: {
        hero: "*",
        seo: { populate: "*" },
      },
    }),
  ])
  return [categoriesRes, partsRes, homepageRes]
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

export async function getCategoryPaths() {
  const categoriesRes = await fetchAPI("/categories", { fields: ["slug"] })

  return {
    paths: categoriesRes.data.map((category) => ({
      params: {
        slug: category.attributes.slug,
      },
    })),
    fallback: false,
  }

  // return categoriesRes
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
