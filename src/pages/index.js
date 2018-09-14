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
    padding: '10px',
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
    marginTop: "10px",
    marginBottom: "10px",
    [presets.Mobile]: {
      marginTop: "15px",
      marginBottom: "15px",
    },
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
    height: '65px',
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
    maxHeight: '40px',
  },
}

const emailSignupStyles = {
  statusText: {
    textAlign: 'center',
    margin: '5px 0px',
    color: colors.grey,
    fontSize: '14px',
  },
  title: {
    marginTop: '0px',
    marginBottom: '0px',
    textAlign: 'center',
    fontSize: '16px !important',
    [presets.Mobile]: {
      fontSize: "20px !important",
    }  
  },
  disclaimer: {
    color: colors.grey,
    textAlign: 'center',
    fontSize: '8px !important',
    padding: '0 !important',
    margin: '5px !important',
    [presets.Mobile]: {
      fontSize: "12px !important",
    }
  },
  subscribeText: {
    textAlign: 'center',
    fontSize: '10px',
    [presets.Mobile]: {
      fontSize: "12px !important",
    }
  },
  background: {
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightGrey,
    width: '100vw',
    padding: '5px',
    margin: '5px',
    [presets.Mobile]: {
      padding: '20px',
      margin: '20px',
    }
  },
  button: {
    fontSize: "1em",
    width: '300px',
    backgroundColor: colors.green,
    margin: '0px',
    padding: "10px",
    [presets.Mobile]: {
      margin: '10px',
      padding: "15px",
    }
  },
  input: {
    width: "300px",
    borderRadius: '5px',
    border: 0,
    padding: '5px',
    fontSize: "1em",
    textAlign: 'center',
    [presets.Mobile]: {
      padding: '10px',
      fontSize: "1.5em",
    }
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
      css={emailSignupStyles.background}
    >
      <h1 css={emailSignupStyles.title}>
        Get this song in your inbox
      </h1>
      <p css={emailSignupStyles.subscribeText}>
        Subscribe to get the lastest tracks & videos
      </p>
      {display}
      <input
        style={emailSignupStyles.input}
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
        style={emailSignupStyles.button}
        onClick={submit}
      >
        Follow The Rise
      </Button>
      <p css={emailSignupStyles.disclaimer}>
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
      return <Retailer {...retailer} link={link} key={retailer.linkKey} page={frontmatter.path} />
    })
  }

  const youtubeSizes = [
    {width: "320", height: "150", style: "Small"},
    {width: "628", height: "300", style: "Medium"},
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

  const coverArt = <img css={styles.image} src={frontmatter.image} />
  const mainContent = () => {
    if (frontmatter.videoId) {
      return <div css={styles.youtubeContainer}> {youtubeElements}</div>
    }
    if (frontmatter.image) {
      return coverArt
    } 
    return <div></div>
  }

  const content = mainContent()
  // only show cover art at end if not already above
  const endContent = content == coverArt ? null : coverArt

  return(
    <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
      <Header title={data.frontmatter.title}/>
      {content}
      {frontmatter.mailchimpURL &&
        <SubscribeElement
          url={frontmatter.mailchimpURL + `&SIGNUP=${frontmatter.path}`}
          title={data.frontmatter.title}
          page={data.frontmatter.path}
        />
      }
      {renderRetailers()}
      {endContent}
    </div>
  )
}


class Blog extends React.Component {
  render() {
    return (
      <div css={applicationStyles.outer} >
        <div css={{...styles.outer }}>
           "CODY RAY MUSIC"
        </div>
      </div>
    )
  }
}
  

export default Blog