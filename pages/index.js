import React from "react"
import Layout from "../components/layout"
import Parts from "../components/parts"
import Seo from "../components/seo"
import { fetchAPI, getIndexData } from "../lib/api"
import { shopifyClient, parseShopifyResponse } from "../lib/shopify"

const Home = ({ categories, parts, homepage, products }) => {
  return (
    <Layout categories={categories}>
      <Seo seo={homepage.attributes.seo} />
      <div className="uk-container uk-container-large">
        {/* <h1>{homepage.attributes.hero.title}</h1> */}
        <Parts parts={parts} products={products} />
        <div className="uk-margin-large-bottom"></div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  // const [categoriesRes, partsRes, homepageRes] = await Promise.all([
  //   fetchAPI("/categories", { populate: "*" }),
  //   fetchAPI("/parts", { populate: "*" }),
  //   fetchAPI("/homepage", {
  //     populate: {
  //       hero: "*",
  //       seo: { populate: "*" },
  //     },
  //   }),
  // ])
  const [categoriesRes, partsRes, homepageRes] = await getIndexData()

  // Fetch all the products
  // const products = await shopifyClient.product.fetchAll()

  return {
    props: {
      categories: categoriesRes.data,
      parts: partsRes.data,
      homepage: homepageRes.data,
      // products: parseShopifyResponse(products),
      products: [],
    },
    revalidate: 1,
  }
}

export default Home
