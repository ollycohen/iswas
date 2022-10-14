import Parts from "../../components/parts"
import {
  fetchAPI,
  getCategories,
  getMatchingCategories,
  getCategoryPaths,
} from "../../lib/api"
import Layout from "../../components/layout"
import Seo from "../../components/seo"

const Category = ({ category, categories }) => {
  const seo = {
    metaTitle: category.attributes.name,
    metaDescription: `All ${category.attributes.name} parts`,
  }

  return (
    <Layout categories={categories.data}>
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
  // let categoriesRes = await fetchAPI("/categories", { fields: ["slug"] })
  const categoriesRes = await getCategoryPaths()
  // // .then(cats => {console.log(cats)}).catch(reason => console.error(reason))

  // return {
  //   paths: categoriesRes.data.map((category) => ({
  //     params: {
  //       slug: category.attributes.slug,
  //     },
  //   })),
  //   fallback: false,
  // }
  return categoriesRes
}

export async function getStaticProps({ params }) {
  // const matchingCategories = await fetchAPI("/categories", {
  //   filters: { slug: params.slug },
  //   populate: {
  //     parts: {
  //       populate: "*",
  //     },
  //   },
  // })
  const matchingCategories = await getMatchingCategories(params)

  const allCategories = await getCategories()
  // const allCategories = await fetchAPI("/categories")
  return {
    props: {
      category: matchingCategories.data[0],
      categories: allCategories,
    },
    revalidate: 1,
  }
}

// getStaticProps().then(props => {console.log(props)})

export default Category
