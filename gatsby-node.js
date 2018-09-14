const _ = require("lodash")
const Promise = require("bluebird")
const path = require("path")
const select = require(`unist-util-select`)
const fs = require(`fs-extra`)
const parseFilepath = require("parse-filepath")

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const pages = []
    const linkPageTemplate = path.resolve("./src/templates/linkPage.js")
    const formPageTemplate = path.resolve("./src/templates/formPage.js")
    resolve(
      graphql(
        `{
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
                fileType
              }
            }
          }
        }
      }
    `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create link pages.
        _.each(result.data.allMarkdownRemark.edges, edge => {
          console.log(edge)
          createPage({
            path: edge.node.fields.slug,
            component: edge.node.fields.fileType === 'linkPages' ? linkPageTemplate : formPageTemplate,
            context: {
              slug: edge.node.fields.slug,
              fileType: edge.node.fields.fileType,
            },
          })
        })
      })
    )
  })
}

// Create slugs for files.
exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators
  let slug
  if (
    node.internal.type === `MarkdownRemark` &&
    getNode(node.parent).internal.type === `File`
  ) {
    const fileNode = getNode(node.parent)
    const parsedFilePath = parseFilepath(fileNode.relativePath)
    // add slugs for linkPages
    slug = `/${parsedFilePath.name}/`
    const fileType = parsedFilePath.dir
    createNodeField({ node, name: `slug`, value: slug })
    createNodeField({ node, name: `fileType`, value: fileType })
  }
}
