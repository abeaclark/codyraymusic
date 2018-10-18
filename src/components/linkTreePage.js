import React from 'react'
import Analytics from 'lib/googleAnalytics'
import { fonts, colors, applicationStyles, metrics } from 'themes'

const retailerStyles = {
  container: {
    width: '100%',
    maxWidth: '600px',
    height: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    borderBottom: '0 !important',
    textDecoration: 'none',
    backgroundColor: colors.lightGrey,
    color: "black",
    marginBottom: '10px',
  },
}

const Link = ({link, title, page}) => {
  return (
    <a
      href={link}
      css={retailerStyles.container}
      onClick={() => {
        Analytics.click({ target: linkKey, page: page })
      }}
      target="_blank"
    >
      {title}
    </a>
  )
}

export default ({ data } ) => {
  const frontmatter = data.frontmatter
  
  const renderLinks = () => {
    return (frontmatter.links || []).map(link => {
      return <Link link={link.link} title={link.title} key={link.link} page={frontmatter.path} />
    })
  }
  console.log(data)
  return(
    <div css={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
      {renderLinks()}
    </div>
  )
}