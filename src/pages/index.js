import React from 'react'
import Header from 'baseComponents/header'
import { fonts, colors, applicationStyles, metrics } from 'themes'
import soundcloud from 'media/soundcloud.png'
import amazonmusic from 'media/amazonmusic.png'
import applemusic from 'media/applemusic.png'
import googleplay from 'media/googleplay.png'
import spotify from 'media/spotify.png'
import youtube from 'media/youtube.png'
import itunes from 'media/itunes.png'
import presets from 'lib/presets'

const styles = {
  outer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  postContainer: {
    width: '100%',
    paddingHorizontal: '80px',
    maxWidth: metrics.maxWidth,
    cursor: 'pointer',
    textDecoration: 'none',
    color: colors.darkGrey,
    position: 'relative',
    fontFamily: 'josfin sans',
    fontWeight: 'normal !important',
  },
  textHolder: {
    position: 'absolute',
    padding: 20,
  },
  image: {
    maxHeight: '180px',
    marginBottom: "30px",
  },
  youtubeContainer: {
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  youtubeSmall: {
    display: "block",
    [presets.Tablet]: {
      display: "none",
    },
    [presets.Desktop]: {
      display: "none",
    },
  },
  youtubeMedium: {
    display: "none",
    [presets.Tablet]: {
      display: "block",
    },
    [presets.Desktop]: {
      display: "none",
    },
  },
  youtubeLarge: {
    display: "none",
    [presets.Desktop]: {
      display: "block",
    },
  },
}

const retailerStyles = {
  container: {
    width: '325px',
    display: 'flex',
    flexDirection: 'row',
    cursor: 'pointer',
  },
  logoContainer: {
    height: '75px',
    width: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    margin: '1px',
    backgroundColor: 'lightgrey',
  },
  textContainer: {
    width: '125px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    margin: '1px',
    backgroundColor: 'lightgrey',
    color: "black",
    fontWeight: 'bold',
  },
  logo: {
    maxWidth: '90px',
    maxHeight: '50px',
  },
} 

const Retailer = ({logo, url, text}) => {
  return (
    <a
      href={url}
      css={retailerStyles.container}
    >
      <div css={retailerStyles.logoContainer}>
        <img css={retailerStyles.logo} src={logo} />
      </div>
      <div css={retailerStyles.textContainer}>
        {text}
      </div>
    </a>
  )
}

export const Post = ({ data, shouldLink=false} ) => {
  console.log(data)
  const frontmatter = data.frontmatter

  const retailers = [
    {logo: soundcloud, linkKey: "soundcloudLink", text: "Listen"},
    {logo: amazonmusic, linkKey: "amazonMusicLink", text: "Buy"},
    {logo: applemusic, linkKey: "appleMusicLink", text: "Listen"},
    {logo: googleplay, linkKey: "googlePlayLink", text: "Buy"},
    {logo: spotify, linkKey: "spotifyLink", text: "Listen"},
    {logo: youtube, linkKey: "youTubeLink", text: "Listen"},
    {logo: itunes, linkKey: "iTunesLink", text: "Buy"},
  ]
  
  const renderRetailers = () => {
    return retailers.map(retailer => {
      const link = frontmatter[retailer.linkKey]
      if (!link) {
        return null
      }
      return <Retailer {...retailer} link={link} key={link} />
    })
  }

  const youtubeSizes = [
    {width: "400", height: "200", style: "Small"},
    {width: "628", height: "350", style: "Medium"},
    {width: "800", height: "450", style: "Large"},
  ]

  const youtubeElements = youtubeSizes.map(size => {
    const style = styles[`youtube${size.style}`]
    console.log(style)
    return (
      <div css={style}>
      <iframe
        width={size.width}
        height={size.height}
        src={`https://www.youtube.com/embed/${frontmatter.videoId}`}
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen=""
        key={size.width}>
      </iframe>
      </div>
    )
  })

  return(
    <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Header title={data.frontmatter.title}/>
      <img css={styles.image} src={frontmatter.image} />
      {frontmatter.videoId &&
        <div css={styles.youtubeContainer}>
          {youtubeElements}
        </div>
      }
      {renderRetailers()}
    </div>
  )
}


class Blog extends React.Component {
  render() {
    const { allMarkdownRemark } = this.props.data
    const postList = allMarkdownRemark.edges.map(({ node }) => Post({data: node, shouldLink: true}))
    return (
      <div css={applicationStyles.outer} >
        <Header />
        <div css={{...styles.outer }}>
           {postList}
        </div>
      </div>
    )
  }
}
  

export default Blog

export const pageQuery = graphql`
  query LinkPagesIndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            date(formatString: "M.D.YYYY")
          }
          frontmatter {
            title
            image
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
    }
  }
`