import Nav from "./nav"

const Layout = ({ children, categories, needsHomeButton, seo }) => (
  <>
    <Nav categories={categories} needsHomeButton={needsHomeButton} />
    {children}
  </>
)

export default Layout
