import React from "react"
import Layout from "../components/layout"
import Parts from "../components/parts"
import Seo from "../components/seo"
import { getIndexData } from "../lib/api"
import { shopifyClient, parseShopifyResponse } from "../lib/shopify"
import Footer from "../components/footer"

const Home = ({ categories, parts, homepage, products }) => {
  return (
    <Layout categories={categories}>
      <Seo seo={homepage.attributes.seo} />
      <div className="uk-container uk-container-large">
        <Parts parts={parts} products={products} />
        <div className="uk-margin-large-bottom"></div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [categoriesRes, partsRes, homepageRes] = await getIndexData()

  // Fetch all the products
  const products = await shopifyClient.product.fetchAll()
  // const products = []
  // console.log("INDEX")
  // console.log(products)
  console.log(parseShopifyResponse(products))

  return {
    props: {
      categories: categoriesRes.data,
      parts: partsRes.data,
      homepage: homepageRes.data,
      products: parseShopifyResponse(products),
    },
    revalidate: 1,
  }
}

export default Home
