import React from "react"
import Layout from "../components/layout"
import Parts from "../components/parts"
import Seo from "../components/seo"
import { getBackgroundImage, getIndexData } from "../lib/api"
import { shopifyClient, parseShopifyResponse } from "../lib/shopify"
import Footer from "../components/footer"

const Home = ({
  categories,
  parts,
  homepage,
  products,
  backgroundImageData,
}) => {
  return (
    <Layout categories={categories} backgroundImageData={backgroundImageData}>
      <Seo seo={homepage.attributes.seo} />
      <div className="uk-container uk-container-large">
        <div className="uk-container parts-container">
          <Parts parts={parts} products={products} />
        </div>
        <div className="uk-margin-large-bottom"></div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [categoriesRes, partsRes, homepageRes] = await getIndexData()

  const backgroundImageRes = await getBackgroundImage()

  // Fetch all the products
  const products = await shopifyClient.product.fetchAll()

  return {
    props: {
      categories: categoriesRes.data,
      parts: partsRes.data,
      homepage: homepageRes.data,
      products: parseShopifyResponse(products),
      backgroundImageData: backgroundImageRes.data,
    },
    revalidate: 60,
  }
}

export default Home
