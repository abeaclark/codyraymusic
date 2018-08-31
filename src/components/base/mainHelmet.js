import React from 'react'
import Helmet from 'react-helmet'

const defaultDescription = "Rap artist Cody Ray is an California-based musician. Follow the Rise."
const defaultTitle = "Cody Ray Music"
const defaultImage = "https://links.codyraymusic.com/media/cody-ray.jpg"
const defaultKeywords = 'Keywords'

const mainScript={
  "type": "application/ld+json",
  "innerHTML": `{
    "@context": "http://schema.org",
    "@type": "Organization",
    "name": "CodyRayMusic",
    "url": "https://www.codyraymusic.com",
    "sameAs": [
      "https://www.facebook.com/codyraymusic/",
    ]
  }`
}

export default ({ description=defaultDescription, title=defaultTitle, image=defaultImage, keywords=defaultKeywords, script }) => (
  <Helmet
    title={title}
    meta={[
      { property: 'description', content: description },
      { property: 'keywords', content:  keywords },
      { property: 'image', content: image },
    ]}
    script={[Object.assign(mainScript, script)]}
  >
    <meta property="og:description" content={description} />
    <meta property="twitter:description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:image" content={image} />
    <meta property="og:image" content={image} />
    <meta
      property="twitter:image"
      content={image}
    />
  </Helmet>
)
