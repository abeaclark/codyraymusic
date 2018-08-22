import React from 'react'
import { applicationStyles } from 'themes'

const styles = {
  outer: {
    minHeight: '90vh',
    position: 'relative',
  },
  inner: {
    ...applicationStyles.mainTextContainer,
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    minHeight: '90vh',
  }
}


const Hero = ({ children, style={}, backgroundColor }) =>
  <div css={{...styles.outer, backgroundColor: backgroundColor }}>
    <div css={{...styles.inner, ...style}}>
  	 {children}
    </div>
  </div>

export default Hero
