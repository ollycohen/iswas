import React from "react"
import Link from "next/link"

const Nav = ({ categories }) => {
  const handleCategoryChange = ({ category }) => {
    console.log(category)
  }

  return (
    <div>
      <nav className="uk-navbar-container uk-navbar" data-uk-navbar>
        {/* <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li>
              <Link href="/">
                <a>Strapi Blog</a>
              </Link>
            </li>
          </ul>
        </div> */}
        <div className="uk-navbar-center">
          <ul className="uk-navbar-nav">
            <li key={0}>
              <Link href={`/`}>
                <a className="uk-link-reset">Everything</a>
              </Link>
            </li>
            {categories.map((category, i) => {
              const catName = category.attributes.name
              return (
                <li key={i + 1}>
                  <Link href={`/category/${category.attributes.slug}`}>
                    <a className="uk-link-reset">{category.attributes.name}</a>
                  </Link>
                  {/* <a value={catName} onClick={() => {handleCategoryChange(catName)}} className="uk-link-reset">{catName}</a> */}
                </li>
              )
            })}
            <li key={1000001}>
              <Link href={`/shop`}>
                <a className="uk-link-reset">Shop</a>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Nav
