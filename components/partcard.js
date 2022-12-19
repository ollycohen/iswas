import React from "react"
import Link from "next/link"
import Coverphoto from "./coverphoto"

const Partcard = ({ part }) => {
  const { slug, title, text } = part.attributes

  let category = part.attributes?.category.data
    ? part.attributes.category.data.attributes?.name
    : null

  let preview
  if (category == "writing") {
    preview = <div className="uk-margin-bottom">{text}</div>
  } else {
    preview = <Coverphoto part={part} />
  }
  return (
    <Link href={`/part/${slug}`}>
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted crazy-link-style post-container">
          <div className="uk-card-body">
            <p id="title" className="uk-text-large">
              {title}
            </p>
          </div>
          <div className="uk-card-media-top">{preview}</div>
        </div>
      </a>
    </Link>
  )
}

export default Partcard
