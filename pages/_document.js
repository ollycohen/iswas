import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* eslint-disable-next-line */}
          {/* <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Staatliches"
          /> */}
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/uikit@3.15.10/dist/css/uikit.min.css"
          />
          {/* UIKit JS */}
          <script
            async
            src="https://cdn.jsdelivr.net/npm/uikit@3.15.10/dist/js/uikit.min.js"
          ></script>
          <script
            async
            src="https://cdn.jsdelivr.net/npm/uikit@3.15.10/dist/js/uikit-icons.min.js"
          ></script>
          {/* <script
            async
            src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.2.0/js/uikit.js"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
