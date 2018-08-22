import React from 'react'

const styles = {
  imageContainer: {
    position: 'relative',
    height: 0,
    overflow: 'hidden',
  },
  image:  {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  }
}

// aspectRatio === ratio of image height to width
const ImageHolder = ({ src, css, aspectRatio='75'  }) =>
  <div css={{...styles.imageContainer, paddingBottom: `${aspectRatio}%`}}>
    <img src={src} css={{...styles.image, ...css}} />
  </div>

export default ImageHolder
