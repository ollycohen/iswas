import React, { useContext } from "react"
import { ShopContext } from "../context/shopContext"
import Image from "next/image"
import { FiShoppingCart } from "react-icons/fi"

const Cart = () => {
  const { checkout, closeCart, openCart } = useContext(ShopContext)

  return (
    <div className="uk-padding" uk-overflow-auto>
      <button
        onClick={() => openCart()}
        type="button"
        className="uk-button uk-button-primary"
      >
        Cart <FiShoppingCart className="icon" />
      </button>
      {/* <div hidden className={isCartOpen ? "cart active" : "cart"}> */}
      {/* <div className="toggle" hidden> */}
      <div
        id="cart-body"
        uk-dropbar
        className="uk-dropbar-right uk-padding uk-background-secondary"
        uk-drop="pos: bottom-right; stretch: x; mode: click"
        // uk-modal
        hidden
      >
        <div className="">
          <div onClick={() => closeCart()} className="overlay" />
          <div className="side-content">
            <div className="cart-content-container">
              {checkout.lineItems?.length ? (
                <>
                  <CartItems items={checkout.lineItems} />
                </>
              ) : (
                <EmptyCart />
              )}
            </div>
          </div>
          <div>
            {checkout.lineItems?.length ? (
              <a href={checkout.webUrl}>Checkout</a>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const CartItems = ({ items }) => {
  const { removeItemFromCheckout } = useContext(ShopContext)
  const productRemove = (id) => {
    removeItemFromCheckout(id)
  }

  return (
    <div className="cart--items">
      {items.map((item) => {
        return (
          <div key={item.id}>
            <Image
              width={300}
              height={300}
              src={item.variant?.image.src}
              alt={item.title}
            />
            <div className="item-content">
              <div className="title">{item.title}</div>
              <div className="quantity">{item.quantity}</div>
              <div className="details-con">
                <div className="price">${item.variant?.price}</div>
              </div>
            </div>
            <button
              onClick={() => {
                productRemove(item.id)
              }}
            >
              Remove Items
            </button>
          </div>
        )
      })}
    </div>
  )
}

const EmptyCart = () => (
  <div className="cart--empty">
    <p>Your cart is empty</p>
  </div>
)
export default Cart
