import React from 'react'
import PropTypes from 'prop-types'
import Link from '../components/base/link'
import css from './main.css'
import normalize from './normalize.css'
import MainHelmet from 'components/base/mainHelmet'


const TemplateWrapper = ({ children, location }) => {
  return (
    <div css={{ display: 'flex', minHeight: '100vh', flex: 1, flexDirection: 'column'}}>
      <MainHelmet />
      <div css={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children()}
      </div>
    </div>
  )
}
  

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
