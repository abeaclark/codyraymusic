module.exports = {
  siteMetadata: {
    title: "OnCallogy",
    siteUrl: `https://www.oncallogy.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-glamor`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-sass`,
    'gatsby-plugin-jss',
    {
      resolve: `gatsby-plugin-sitemap`
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages/`,
        name: "pages",
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-102594910-1`,
      },
    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: '145516182783891',
      },
    },
  ],
}
