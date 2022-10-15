import Parts from "../components/parts"
import { getCategories, getCategoryPaths } from "../lib/api"
import Layout from "../components/layout"
import Seo from "../components/seo"

const Shop = ({ parts, categories }) => {
  const seo = {
    metaTitle: "Shop",
    metaDescription: `All for sale parts`,
  }

  return (
    <Layout categories={categories.data} needsHomeButton={true}>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          {/* <Parts parts={parts} /> */}
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  /* TODO Get all products */
  const products = { data: [] }

  const allCategories = await getCategories()
  return {
    props: {
      parts: products.data,
      categories: allCategories,
    },
    revalidate: 1,
  }
}

export default Shop
