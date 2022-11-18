import Parts from "../components/parts"
import { getCategories } from "../lib/api"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { shopifyClient, parseShopifyResponse } from "../lib/shopify"

const Shop = ({ products, categories }) => {
  const seo = {
    metaTitle: "Shop",
    metaDescription: "Buy these products",
  }

  let body
  if (products.length) {
    body = <Parts products={products} />
  } else {
    body = <div> Workin on getting you products </div>
  }
  return (
    <Layout categories={categories.data} needsHomeButton={true}>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">{body}</div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const products = await shopifyClient.product.fetchAll()

  const allCategories = await getCategories()
  return {
    props: {
      products: parseShopifyResponse(products),
      categories: allCategories,
    },
    revalidate: 1,
  }
}

export default Shop
