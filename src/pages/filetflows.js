import React from 'react'
import Header from 'baseComponents/header'
import { fonts, colors, applicationStyles, metrics } from 'themes'
import spotify from 'media/spotify.png'
import presets from 'lib/presets'
import Button from 'components/base/button'
import Analytics from 'lib/googleAnalytics'
import MainHelmet from 'components/base/mainHelmet'

const styles = {
  outer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
  }
}

const IMAGE = "/media/FiletFlowsPlaylistLogo.jpg"
const PATH = '/filetflows/'
const BASE_URL = "https://links.codyraymusic.com"
const DESCRIPTION = "Filet flows features the best rappers in the game."
const TITLE = "Filet Flows | Spotify Playlist"

class FiletFlows extends React.Component {
  render() {
    return (
      <div css={applicationStyles.outer} >
        <MainHelmet
            description={DESCRIPTION}
            title={TITLE}
            image={IMAGE}
            script={{
              "type": "application/ld+json",
              "innerHTML": `{
                "@context": "http://schema.org",
                "@type": "BlogPosting",
                "@id": ${BASE_URL + PATH},
                "url": ${BASE_URL + PATH},
                "headline": "Filet Flows | Spotify Playlist",
                "description": ${DESCRIPTION},
                "image": ${BASE_URL + IMAGE},
                "author": {
                  "@type": "Organization",
                  "name": "CodyRayMusic"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "CodyRayMusic",
                  "logo": {
                    "url": ${BASE_URL + "/android-icon-144x144.png"},
                    "type": "ImageObject"
                  }
                }
              }`
            }}
          />
        <div css={{...styles.outer }}>
          <img src={IMAGE} css={{ width: '100%', maxWidth: '400px'}}/>
          <Button
            onClick={() => window.location = 'spotify:playlist:7n9VDHJMqpHhPHV07hWr0A'}
            style={{ backgroundColor: colors.green, width: '80%', maxWidth: '350px', margin: '30px 0'}}
          >
            Listen to the Playlist
          </Button>
        </div>
      </div>
    )
  }
}
  

export default FiletFlows



