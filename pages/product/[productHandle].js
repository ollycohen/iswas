import ReactMarkdown from "react-markdown"
import { fetchAPI } from "../../lib/api"
import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { useRouter } from 'next/router'
import { shopifyClient, parseShopifyResponse } from '../../lib/shopify'
import NextImage from "next/image"



export default function ProductPage( {product, categories} ) {


    const { id, title, images, description, variants, handle } = product
    const { src: productImage } = images[0]
    const { price } = variants[0]

    const seo = {
        metaTitle: title,
        // metaDescription: part.attributes.text,
        // shareImage: part.attributes.media,
        part: true,
    }

    const router = useRouter()


    const image = 
    <div className="uk-container">
        <NextImage
            // loader={loader}
            layout="responsive"
            width="50%"
            height="50%"
            // objectFit="contain"
            src={productImage}
            alt={`Picture of ${title}`}
        />
    </div>

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
            <a><span  onClick={() => router.back()}>&#8592; Back</span></a>
        </div>
        <div className="uk-width-1-3 uk-card">
            <h1>{title}</h1>
        </div>
      </div>
      
      {image}
      <div className="uk-section">
          <div className="uk-container uk-container-small">
            <ReactMarkdown
              source={description}
              escapeHtml={false}
            />
          </div>
       </div>
       <div className="uk-container">
          <button variant="contained">Add to cart</button>
       </div>
    </Layout>
    );
}


export const getServerSideProps = async ({params}) => {
    const { productHandle } = params
    // Fetch one product
    const product = await shopifyClient.product.fetchByHandle(productHandle);

    //Fetch categories
    const categoriesRes = await fetchAPI("/categories", {populate:"*"})


    return {
        props: {
            product: parseShopifyResponse(product),
            categories: categoriesRes
        },
    };
};