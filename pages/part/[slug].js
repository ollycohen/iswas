import ReactMarkdown from "react-markdown"
import Moment from "react-moment"
import { getCategories, getPart, getPartPath } from "../../lib/api"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { useRouter } from "next/router"
import Media from "../../components/media"

const Part = ({ part, categories }) => {
  //   const imageUrl = getStrapiMultimedia(part.attributes.media)

  const seo = {
    metaTitle: part.attributes.title,
    // metaDescription: part.attributes.text,
    // shareImage: part.attributes.media,
    part: true,
  }
  const router = useRouter()

  const media = part.attributes.media.data
  let display
  if (media != null) {
    display = <Media media={media} />
  }

  return (
    <Layout categories={categories.data}>
      <Seo seo={seo} />
      <div
        id="banner"
        className="uk-grid uk-height-small uk-flex uk-flex-middle uk-background-cover uk-light uk-padding"
        // data-src={imageUrl}
        // data-srcset={imageUrl}
        // data-uk-img
      >
        <div className="uk-width-1-3">
          <a>
            <span onClick={() => router.back()}>&#8592; Back</span>
          </a>
        </div>
        <div className="uk-width-1-3 uk-card">
          <h1>{part.attributes.title}</h1>
        </div>
      </div>
      {display}
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          <ReactMarkdown source={part.attributes.text} escapeHtml={false} />
          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <p className="uk-text-meta uk-margin-remove-top">
              Published:&nbsp;
              <Moment format="MMM Do YYYY">
                {part.attributes.published_at}
              </Moment>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const partsRes = await getPartPath()
  return {
    paths: partsRes.data?.map((part) => ({
      params: {
        slug: part.attributes.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const partRes = await getPart(params)
  const categoriesRes = await getCategories()

  return {
    props: { part: partRes.data[0], categories: categoriesRes },
    revalidate: 60,
  }
}

export default Part
