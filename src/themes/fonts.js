  
export const fontFamilies = {
  comfortaa: {
    fontFamily: "'Comfortaa', serif",
  },
  lato: {
    fontFamily: "'Lato', sans-serif",
  },
}


const fonts = {
  mainTitle: {
    ...fontFamilies.comfortaa,
    fontSize: '2rem',
    lineHeight: '2rem',
  },
  normal: {
    ...fontFamilies.lato,
    fontSize: '1rem',
  }
}

export default fonts