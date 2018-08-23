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
import MailchimpSubscribe from "react-mailchimp-subscribe"
import Spinner from 'react-spinkit'
import Button from 'components/base/button'

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
    marginTop: "30px",
    marginBottom: "30px",
  },
  youtubeContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrey,
    zIndex: -1,
  },
  youtubeSmall: {
    display: "block",
    position: 'relative',
    [presets.Tablet]: {
      display: "none",
    },
    [presets.Desktop]: {
      display: "none",
    },
  },
  youtubeMedium: {
    display: "none",
    position: 'relative',
    [presets.Tablet]: {
      display: "block",
    },
    [presets.Desktop]: {
      display: "none",
    },
  },
  youtubeLarge: {
    position: 'relative',
    display: "none",
    [presets.Desktop]: {
      display: "block",
    },
  },
  spinnerHolder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  }
}

const retailerStyles = {
  container: {
    width: '325px',
    display: 'flex',
    flexDirection: 'row',
    cursor: 'pointer',
    borderBottom: '0 !important',
  },
  logoContainer: {
    height: '75px',
    width: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    margin: '1px',
    backgroundColor: colors.lightGrey,
  },
  textContainer: {
    width: '125px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    margin: '1px',
    backgroundColor: colors.lightGrey,
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


// Error: Timeout
const SubscribeForm = ({ url, status, message, onValidated }) => {
  let email, name;
  const submit = () =>
    email && name && email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
      NAME: name.value
    })

  return (
    <div
      css={{
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.lightGrey,
        width: '100vw',
        padding: '30px',
        margin: '30px',
      }}
    >
      <h1 css={{ marginTop: '0px', marginBottom: '0px', textAlign: 'center'}}>
        Get this track in your inbox
      </h1>
      <p css={{ textAlign: 'center' }}>
        Subscribe to get the lastest tracks & videos
      </p>
      {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
      {status === "error" && (
        <div
          style={{ color: "red" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          style={{ color: "green" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      <input
        style={{ fontSize: "1.5em", padding: '10px', width: "300px", borderRadius: '5px', border: 0 }}
        ref={node => (email = node)}
        type="email"
        placeholder="your@email.here"
        autofocus="true"
      />
      <br />
      <Button
        style={{ fontSize: "1em", padding: "15px", width: '300px', backgroundColor: colors.green, margin: '10px' }}
        onClick={submit}
      >
        Follow The Rise
      </Button>
      <p css={{ color: colors.grey, fontSize: '12px' }}>
        By clicking, you agree to subscribe to updates from CodyRayMusic
      </p>
    </div>
  )
}

const SubscribeElement = ({ url }) => (
  <MailchimpSubscribe
    url={url}
    render={({ subscribe, status, message }) => (
      <SubscribeForm
        status={status}
        message={message}
        onValidated={formData => subscribe(formData)}
      />
    )}
  />
)

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
    const currentStyle = styles[`youtube${size.style}`]
    return (
      <div css={currentStyle}>
      <div css={styles.spinnerHolder}>
        <Spinner name="line-scale-pulse-out-rapid" color={colors.green} />
      </div>
      <iframe
        width={size.width}
        height={size.height}
        src={`https://www.youtube.com/embed/${frontmatter.videoId}`}
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen=""
        key={size.width}
        style={{border: 0, zIndex: 2 }}
      >
      </iframe>
      </div>
    )
  })

  return(
    <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
      <Header title={data.frontmatter.title}/>
      {frontmatter.videoId &&
        <div css={styles.youtubeContainer}>
          {youtubeElements}
        </div>
      }
      {frontmatter.mailchimpURL &&
        <SubscribeElement
          url={frontmatter.mailchimpURL}
        />
      }
      {renderRetailers()}
      {frontmatter.image && 
        <img css={styles.image} src={frontmatter.image} />
      }
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
            mailchimpURL
          }
        }
      }
    }
  }
`