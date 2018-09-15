import React from 'react'
import { applicationStyles } from 'themes'
import MainHelmet from 'components/base/mainHelmet'
import './avenir-white.css'
import { FormPage } from 'components/formPage'


const BASE_URL = "https://links.codyraymusic.com"


class LinkPageTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark

    return (
      <div>
        <div className="blog-post" css={applicationStyles.mainTextContainer}>
          <MainHelmet
            description={post.excerpt}
            title={`${post.frontmatter.title} | CodyRayMusic`}
            image={BASE_URL + post.frontmatter.image}
            script={{
              "type": "application/ld+json",
              "innerHTML": `{
                "@context": "http://schema.org",
                "@type": "BlogPosting",
                "@id": BASE_URL + post.frontmatter.path,
                "url": BASE_URL + post.frontmatter.path,
                "headline": post.frontmatter.title,
                "description": post.excerpt || "Subscribe for the latest songs, videos, and more",
                "image": BASE_URL + post.frontmatter.image,
                "author": {
                  "@type": "Organization",
                  "name": "CodyRayMusic"
                },
                "datePublished": "${post.frontmatter.date}",
                "publisher": {
                  "@type": "Organization",
                  "name": "CodyRayMusic",
                  "logo": {
                    "url": BASE_URL + "/android-icon-144x144.png",
                    "type": "ImageObject"
                  }
                }
              }`
            }}
          />
          { FormPage({ data: post }) }
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </div>
    )
  }
}


export const pageQuery = graphql`
  query SingleFormPage($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      excerpt
      frontmatter {
        title
        subtitle
        disclaimer
        buttonText
        image
        date(formatString: "M.D.YYYY")
        path
        mailchimpURL
      }
    }
  }`

export default LinkPageTemplate
