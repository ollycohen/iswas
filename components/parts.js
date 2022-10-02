import React from "react"
// import NextImage from "./image"
import Partcard from "./partcard"
import NextImage from 'next/image'
import Link from 'next/link'


const Parts = ({ parts, products }) => {
  
  return (
    <div>
        <div>   
           {parts.map((part, i) => {
              return (
                <div key={i}>
                  <Partcard part={part} />
                </div>
              )
            })}
        </div>
        <div>   
           {products.map((product, i) => {
              
              const { id, title, images, description, variants, handle } = product
              const { src: productImage } = images[0]
              const { price } = variants[0]

              const image = 
                  <NextImage
                      // loader={loader}
                      layout="responsive"
                      width="100%"
                      height="100%"
                      // objectFit="contain"
                      src={productImage}
                      alt={`Picture of ${title}`}
                  />
           

              return (
                <div key={i+parts.length}>
                  <Link key={parts.length+i} href={`/product/${handle}`}>
                    <a className="uk-link-reset">
                      <div className="uk-card uk-card-muted">
                          <div className="uk-card-body">
                              <p id="title" className="uk-text-large">
                              {title}
                              </p>
                          </div>
                        <div className="uk-card-media-top">
                          {image}
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>

                
              )
            })}
      </div>
    </div>
  )
}

export default Parts

