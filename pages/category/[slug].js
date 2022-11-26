import Parts from "../../components/parts"
import {
  getCategories,
  getMatchingCategories,
  getCategoryPaths,
  getBackgroundImage,
} from "../../lib/api"
import Layout from "../../components/layout"
import Seo from "../../components/seo"

const Category = ({ category, categories, backgroundImageData }) => {
  const seo = {
    metaTitle: category.attributes.name,
    metaDescription: `All ${category.attributes.name} parts`,
  }

  return (
    <Layout
      categories={categories.data}
      backgroundImageData={backgroundImageData}
    >
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <Parts parts={category.attributes.parts.data} products={[]} />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const categoriesRes = await getCategoryPaths()

  return {
    paths: categoriesRes.data.map((category) => ({
      params: {
        slug: category.attributes.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const matchingCategories = await getMatchingCategories(params)
  const allCategories = await getCategories()
  const backgroundImage = await getBackgroundImage()
  return {
    props: {
      category: matchingCategories.data[0],
      categories: allCategories,
      backgroundImageData: backgroundImage.data,
    },
    revalidate: 1,
  }
}

export default Category
