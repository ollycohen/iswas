import Parts from "../components/parts"
import { getCategories, getBackgroundImage } from "../lib/api"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { shopifyClient, parseShopifyResponse } from "../lib/shopify"

const Shop = ({ products, categories, backgroundImageData }) => {
  const seo = {
    metaTitle: "Shop",
    metaDescription: "Buy these products",
  }

  let body
  if (products.length) {
    body = <Parts products={products} />
  } else {
    body = <div className="uk-container"> No products rn </div>
  }
  return (
    <Layout
      categories={categories.data}
      backgroundImageData={backgroundImageData}
      needsHomeButton={true}
    >
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">{body}</div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const products = await shopifyClient.product.fetchAll()

  const allCategories = await getCategories()

  const backgroundImageRes = await getBackgroundImage()

  return {
    props: {
      products: parseShopifyResponse(products),
      categories: allCategories,
      backgroundImageData: backgroundImageRes.data,
    },
    revalidate: 60,
  }
}

export default Shop
