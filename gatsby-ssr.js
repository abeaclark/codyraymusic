import React from "react"

exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents()
  console.log('all')
  headComponents.forEach(com => console.log(com))
  replaceHeadComponents(headComponents)
}