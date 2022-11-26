import React from "react"
import Link from "next/link"
// import { ShopContext } from "../context/shopContext"
import Cart from "./cart"

const Nav = ({ categories }) => {
  // const handleCategoryChange = ({ category }) => {
  //   console.log(category)
  // }
  // const { openCart } = useContext(ShopContext)

  return (
    <nav className="uk-navbar-container uk-navbar uk-margin-medium-bottom">
      <div className="uk-navbar-center uk-margin-top">
        <ul className="uk-navbar-nav">
          <li key={0}>
            <Link href={`/`}>
              <a className="uk-link-reset crazy-link-style">Everything</a>
            </Link>
          </li>
          {categories.map((category, i) => {
            const catName = category.attributes.name
            return (
              <li key={i + 1}>
                <Link href={`/category/${category.attributes.slug}`}>
                  <a className="uk-link-reset crazy-link-style">
                    {category.attributes.name}
                  </a>
                </Link>
                {/* <a value={catName} onClick={() => {handleCategoryChange(catName)}} className="uk-link-reset">{catName}</a> */}
              </li>
            )
          })}
          <li key={1000001}>
            <Link href={`/shop`}>
              <a className="uk-link-reset crazy-link-style">Shop</a>
            </Link>
          </li>
        </ul>
      </div>

      <div className="uk-navbar-right uk-margin-right uk-margin-top">
        <ul className="uk-navbar-nav">
          <li>
            <Cart />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav
