import React from 'react'
import Link from './link'
import { fonts, colors } from '../../themes'

const defaultStyle = {
  ...fonts.normal,
  border: 'none',
  borderRadius: 30,
  background: colors.mainBlue,
  color: colors.white,
  cursor: 'pointer',
  padding: `10px 20px`,
  verticalAlign: 'middle',
  ':hover': {
  },
  ':focus': {
    outline: 0,
  },
}

export default ({ children, style, to, onClick }) => {
  const button = (
    <button
      css={{ ...defaultStyle, ...style }}
      onClick={onClick}
    >
      {children}
    </button>
  )

  if (to) {
    return (
      <Link
        to={to}
      >
        {button}
      </Link>
    )
  } else {
    return <span>{button}</span>
  }
}