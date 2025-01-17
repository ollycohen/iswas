import App from "next/app"
import Head from "next/head"
import { createContext } from "react"
import { getGlobal } from "../lib/api"
import { getStrapiMedia } from "../lib/media"
import ShopProvider from "../context/shopContext"
import Cart from "../components/cart"
import Footer from "../components/footer"
import "../assets/css/style.css"
import { Nunito } from "@next/font/google"

const nunito = Nunito({
  weight: "200",
})

// Store Strapi Global object in context
export const GlobalContext = createContext({})

const MyApp = ({ Component, pageProps }) => {
  const { global } = pageProps
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href={getStrapiMedia(global.attributes.favicon)}
        />
      </Head>
      <GlobalContext.Provider value={global.attributes}>
        <ShopProvider>
          <style jsx global>{`
            html {
              font-family: ${nunito.style.fontFamily};
              font-weight: 330;
            }
            div {
              font-weight: 300;
            }
          `}</style>
          <Component {...pageProps} />
        </ShopProvider>
      </GlobalContext.Provider>
    </>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx)
  // Fetch global site settings from Strapi
  const globalRes = await getGlobal()

  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data } }
}

// export default withData(MyApp)
export default MyApp
