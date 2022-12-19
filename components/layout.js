import Footer from "./footer"
import Nav from "./nav"
import NextImage from "next/image"
import useWindowDimensions from "../hooks/useWindowDimension"

const Layout = ({
  children,
  categories,
  needsHomeButton,
  seo,
  backgroundImageData,
}) => {
  const { width, height } = useWindowDimensions()

  return (
    <div style={{}}>
      {backgroundImageData?.attributes?.backgroundImage.data ? (
        <div style={{ position: "fixed", justifyContent: "center" }}>
          <NextImage
            src={
              backgroundImageData.attributes.backgroundImage.data.attributes
                ?.url
            }
            width={width ? width : "800px"}
            height={height ? height : "800px"}
          ></NextImage>
        </div>
      ) : (
        <></>
      )}
      <div style={{ position: "center" }}>
        <Nav categories={categories} needsHomeButton={needsHomeButton} />
        <div className="uk-container" style={{ background: "black" }}>
          {children}
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
