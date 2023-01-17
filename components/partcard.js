import React from "react"
import Link from "next/link"
import Coverphoto from "./coverphoto"

const Partcard = ({ part }) => {
  const { slug, title, text } = part.attributes

  let preview = <Coverphoto part={part} />
  return (
    <Link href={`/part/${slug}`} legacyBehavior>
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted crazy-link-style partcard-container">
          <div className="uk-card-body">
            <p id="title" className="uk-text-large">
              {title}
            </p>
          </div>
          <div className="uk-card-media-top partcard-wrapper">{preview}</div>
        </div>
      </a>
    </Link>
  )
}

export default Partcard
