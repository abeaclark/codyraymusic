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
import Analytics from 'lib/googleAnalytics'

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
    zIndex: 1,
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
    textDecoration: 'none',
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

const emailSignupStyles = {
  statusText: {
    textAlign: 'center',
    margin: '5px 0px',
    color: colors.grey,
    fontSize: '14px',
  }
}

const Retailer = ({logo, link, text, linkKey, page}) => {
  return (
    <a
      href={link}
      css={retailerStyles.container}
      onClick={() => {
        Analytics.click({ target: linkKey, page: page })
      }}
      target="_blank"
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
const SubscribeForm = ({ url, status, message, onValidated, title }) => {
  let email, name;
  const submit = () => {
    email && email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
    })
  }

  let display = <div/>
  if (status === 'error') {
    if (message === "Error: Timeout") {
      display = <div css={emailSignupStyles.statusText}>There was an error subscribing. Please try again later.</div>
    } else {
      display = <div css={emailSignupStyles.statusText}>You're already subscrbied. Invite a friend to subscribe!</div>
    }
  }

  if (status === 'success') {
    display = <div css={emailSignupStyles.statusText}>Got it! Expect the track in your inbox shortly</div>
  }

  if (status === 'sending') {
    display = <div css={emailSignupStyles.statusText}>Adding you to the list...</div>
  }

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
      {display}
      <input
        style={{ fontSize: "1.5em", padding: '10px', width: "300px", borderRadius: '5px', border: 0 }}
        ref={node => (email = node)}
        type="email"
        placeholder="your@email.here"
        autoFocus="true"
      />
      <input
        style={{ display: 'none' }}
        type="text"
        name="SIGNUP"
        id="SIGNUP"
        value="*|SIGNUP|*"
      />
      <br />
      <Button
        style={{ fontSize: "1em", padding: "15px", width: '300px', backgroundColor: colors.green, margin: '10px' }}
        onClick={submit}
      >
        Follow The Rise
      </Button>
      <p css={{ color: colors.grey, fontSize: '12px', textAlign: 'center' }}>
        By clicking, you agree to subscribe to updates from CodyRayMusic
      </p>
    </div>
  )
}

const SubscribeElement = ({ url, title, page }) => (
  <MailchimpSubscribe
    url={url}
    render={({ subscribe, status, message }) => (
      <SubscribeForm
        status={status}
        message={message}
        onValidated={formData => {
          subscribe(formData)
          Analytics.lead({ target: `Subscribe for free track`, page: page, email: formData.EMAIL })
        }}
        title={title}
      />
    )}
  />
)

export const Post = ({ data, shouldLink=false} ) => {
  const frontmatter = data.frontmatter

  const retailers = [
    {logo: spotify, linkKey: "spotifyLink", text: "Listen"},
    {logo: applemusic, linkKey: "appleMusicLink", text: "Listen"},
    {logo: itunes, linkKey: "iTunesLink", text: "Buy"},
    {logo: youtube, linkKey: "youTubeLink", text: "Listen"},
    {logo: soundcloud, linkKey: "soundcloudLink", text: "Listen"},
    {logo: amazonmusic, linkKey: "amazonMusicLink", text: "Buy"},
    {logo: googleplay, linkKey: "googlePlayLink", text: "Buy"},
  ]
  
  const renderRetailers = () => {
    return retailers.map(retailer => {
      const link = frontmatter[retailer.linkKey]
      if (!link) {
        return null
      }
      return <Retailer {...retailer} link={link} key={link} page={frontmatter.path} />
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
      <div css={currentStyle} key={size.width}>
        <div css={styles.spinnerHolder}>
          <Spinner name="line-scale-pulse-out-rapid" color={colors.green} />
        </div>
        <iframe
          width={size.width}
          height={size.height}
          src={`https://www.youtube.com/embed/${frontmatter.videoId}`}
          allowfullscreen="true"
          style={{
            border: 0,
            zIndex: 20,
          }}
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
          url={frontmatter.mailchimpURL + `&SIGNUP=${frontmatter.path}`}
          title={data.frontmatter.title}
          page={data.frontmatter.path}
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