import Footer from "./footer"
import Nav from "./nav"
import NextImage from "next/image"

const Layout = ({
  children,
  categories,
  needsHomeButton,
  seo,
  backgroundImageData,
}) => {
  return (
    <div>
      <div>
        {backgroundImageData?.attributes.backgroundImage.data ? (
          <NextImage
            src={
              backgroundImageData.attributes.backgroundImage.data.attributes
                ?.url
            }
            layout="fill"
          ></NextImage>
        ) : (
          <></>
        )}
      </div>
      <div>
        <Nav categories={categories} needsHomeButton={needsHomeButton} />
        {children}
        <Footer />
      </div>
    </div>
  )
}

export default Layout
