import React from 'react'
import Header from 'baseComponents/header'
import { fonts, colors, applicationStyles, metrics } from 'themes'
import spotify from 'media/spotify.png'
import presets from 'lib/presets'
import Button from 'components/base/button'
import Analytics from 'lib/googleAnalytics'

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

class FiletFlows extends React.Component {
  render() {
    return (
      <div css={applicationStyles.outer} >
        <div css={{...styles.outer }}>
          <img src="/media/FiletFlowsPlaylistLogo.jpg" css={{ width: '100%', maxWidth: '400px'}}/>
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



