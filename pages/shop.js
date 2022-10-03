import Parts from "../components/parts"
import { fetchAPI } from "../lib/api"
import Layout from "../components/layout"
import Seo from "../components/seo"

const Shop = ({ parts, categories }) => {
  const seo = {
    metaTitle: "Shop",
    metaDescription: `All for sale parts`,
  }

  console.log(parts)
  return (
    <Layout categories={categories.data} needsHomeButton={true}>
      <Seo seo={seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <Parts parts={parts} />
        </div>
      </div>
    </Layout>
  )
}

// export async function getStaticPaths() {

//   const categoriesRes = await fetchAPI("/categories", { fields: ["slug"] })

//   return {
//     paths: categoriesRes.data.map((category) => ({
//       params: {
//         slug: category.attributes.slug,
//       },
//     })),
//     fallback: false,
//   }

// }

export async function getStaticProps({ params }) {
  const forSaleParts = await fetchAPI("/parts", {
    filters: {
      forsale: true,
    },
    populate: "*",
  })

  const allCategories = await fetchAPI("/categories")
  return {
    props: {
      parts: forSaleParts.data,
      categories: allCategories,
    },
    revalidate: 1,
  }
}

// getStaticProps().then(props => {console.log(props)})

export default Shop
