import React from 'react'
import { metrics, colors } from 'themes'
import Link from 'gatsby-link'
import presets from 'lib/presets'

const styles = {
  outer: {
    width: "100%",
    maxWidth: metrics.maxWidth,
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: "center",
    color: colors.darkGrey,
    textDecoration: 'none',
    fontFamily: 'Josefin Sans !important',
    fontWeight: 'normal !important',
    border: '0px !important',
    fontSize: '15px',
    [presets.Mobile]: {
      fontSize: "25px !important",
    }
  },
}


const Header = ({title}) =>
  <div
    css={styles.outer}
    to="/"
  >
    {title}
  </div>

export default Header
