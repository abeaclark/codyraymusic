import React from 'react'
import { metrics, colors } from 'themes'
import sf from 'media/sf-min.png'
import Link from 'gatsby-link'
import presets from 'lib/presets'
import ImageHolder from './imageHolder'

const styles = {
  outer: {
    width: "100%",
    maxWidth: metrics.maxWidth,
    position: 'relative',
  },
  linksContainer: {
    display: 'flex',
    flex: -1,
    top: '25%',
    justifyContent: 'space-around',
    position: 'absolute',
    width: '100%',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  links: {
    fontFamily: 'Josefin Sans',
    display: 'flex',
    fontWeight: 'bold',
    flex: 0.33,
    height: '30px',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    textDecoration: 'none',
    ':hover': {
      color: colors.lightGrey,
    },
    ':active': {
      color: colors.lightGrey,
    },
    ':focus': {
      color: colors.lightGrey,
    },
  },
}


const TOC = ({ pathname=null, image=sf }) =>{
  let active
  if (pathname) {
    if (/blog/g.test(pathname)){
      active = 'blog'
    }
    if (/prints/g.test(pathname)){
      active = 'prints'
    }
    if (/work/g.test(pathname)){
      active = 'work'
    }
  }
  console.log(active)

  return (
    <div css={{...styles.outer }}>
      <ImageHolder src={image} css={{ width: '100%', maxWidth: metrics.maxWidth }}/>
      <div css={styles.linksContainer}>
        <Link css={{ ...styles.links, fontSize: active === 'work' ? '24px' : null }} to="/work">WORK</Link>
        <Link css={{ ...styles.links, fontSize: active === 'prints' ? '24px' : null }} to="/prints">PRINTS</Link>
        <Link css={{ ...styles.links, fontSize: active === 'blog' ? '24px' : null }} to="/blog">BLOG</Link>
      </div>
    </div>
  )
}
  

export default TOC
