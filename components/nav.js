import React, { useState } from "react"
import Link from "next/link"
// import { ShopContext } from "../context/shopContext"
import Cart from "./cart"
import Navitem from "./navitem"
import useWindowDimensions from "../hooks/useWindowDimension"

const Nav = ({ categories }) => {
  // const { openCart } = useContext(ShopContext)

  const [navActive, setNavActive] = useState(null)
  const [activeIdx, setActiveIdx] = useState(-1)

  return (
    <header>
      <nav className="uk-navbar-container uk-navbar">
        <div
          onClick={() => setNavActive(!navActive)}
          className={`nav__menu-bar menu-icon`}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className={`${navActive ? "active" : ""} nav__menu-list`}>
          <li key={0}>
            <Navitem href={`/`} text="Everything" active={activeIdx === 0} />
          </li>
          {categories.map((category, idx) => {
            const catName = category.attributes.name
            return (
              <li
                key={idx + 1}
                onClick={() => {
                  setActiveIdx(idx)
                  setNavActive(false)
                }}
              >
                <Navitem
                  href={`/category/${category.attributes.slug}`}
                  text={category.attributes.name}
                  active={activeIdx === idx}
                />
              </li>
            )
          })}
          <li key={1000001}>
            <Navitem
              href={"/shop"}
              text="Buy Stuff"
              active={activeIdx === 1000001}
            />
          </li>
        </ul>

        <div className="uk-navbar-right uk-margin-right uk-margin-top">
          <ul className="uk-navbar-nav">
            <li>
              <Cart />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Nav
