import React from 'react'
import { applicationStyles } from 'themes'
import MainHelmet from 'components/base/mainHelmet'
import './avenir-white.css'
import { Post } from 'pages/index'

const styles = {
  image: {
    width: '100%',
    maxWidth: 500,
    border: '0px',
  },
}

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
            image={post.frontmatter.image}
            script={{
              "type": "application/ld+json",
              "innerHTML": `{
                "@context": "http://schema.org",
                "@type": "BlogPosting",
                "@id": BASE_URL + post.frontmatter.path,
                "url": BASE_URL + post.frontmatter.path,
                "headline": post.frontmatter.title,
                "description": post.excerpt,
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
          { Post({ data: post }) }
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </div>
    )
  }
}

export default LinkPageTemplate

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
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
          image
          date(formatString: "M.D.YYYY")
          path
          videoId
          spotifyLink
          appleMusicLink
          iTunesLink
          youTubeLink
          soundcloudLink
          googlePlayLink
          amazonMusicLink
        }
      }
    }
  `