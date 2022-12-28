import Footer from "./footer"
import Nav from "./nav"
import Image from "next/image"
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
        <div
          style={{
            position: "fixed",
            height: height ? height : 1000,
            width: width ? width : 800,
          }}
        >
          <Image
            src={
              backgroundImageData.attributes.backgroundImage.data.attributes
                ?.url
            }
            alt="Background art by Isaac Sosebee"
            width={width ? width : 800}
            height={height ? height : 800}
            style={{
              minHeight: "100%",
              minWidth: "100%",
            }}
            priority={true}
          />
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
