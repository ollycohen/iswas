import React from "react"
import Link from "next/link"
import Coverphoto  from "./coverphoto"

const Partcard = ({ part }) => {

  const {slug, title, text } = part.attributes

  let preview;
  let category = part.attributes.category.data.attributes.name
  
  if (category == "writing") {
    const limit = 100
    if (text.length <= limit){
        preview = <div className="uk-margin-bottom">{text}</div>
    } else {
        preview = text.substr(0, limit)
        for(let i = limit; i < text.length; i++){  
            if (text[i] == '.'){
                preview = <div className="uk-margin-bottom">{text.substr(0, i+1)}</div>     
                break
            }
        }
    }
    preview
  } else {
    preview = <Coverphoto part={part} />
  }
  return (
    <Link href={`/part/${slug}`} >
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
            <div className="uk-card-body">
                {/* <p id="category" className="uk-text-uppercase">
                {category}
                </p> */}
                <p id="title" className="uk-text-large">
                {title}
                </p>
            </div>
          <div className="uk-card-media-top">
            {/* <Media media={part.attributes.media} /> */}
            {preview}
          </div>
          
        </div>
      </a>
    </Link>
  )
}

export default Partcard
