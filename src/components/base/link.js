import React from 'react'
import Link from 'gatsby-link'
import { fonts, colors, applicationStyles } from '../../themes'

const StyledLink = ({ css, children, href, ...props }) => {
  if (href) {
    return (
      <a href={href} target="blank" css={[applicationStyles.link, css]}>
        {children}
      </a>
    )
  }
  return (
    <Link {...props} css={[applicationStyles.link, css]}>
      {children}
    </Link>
  )
}
	
export default StyledLink


