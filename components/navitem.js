import Link from "next/link"
const Navitem = ({ text, href, active }) => {
  return (
    <Link href={href} legacyBehavior>
      <a className={`uk-link-reset ${active ? "active" : ""}`}>
        <div className="nav-button">{text}</div>
      </a>
    </Link>
  )
}

export default Navitem
