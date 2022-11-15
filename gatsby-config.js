/**
 * @type {import('gatsby').GatsbyConfig}
 */

require('dotenv').config({
  path: `./env/.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'tiina.dev',
    siteUrl: 'https://tiina.dev'
  },
  plugins: [{
    resolve: 'gatsby-source-datocms',
    options: {
      'apiToken': process.env.datoApiToken,
    }
  }, 'gatsby-plugin-image', 'gatsby-plugin-sharp', 'gatsby-transformer-sharp', 'gatsby-plugin-styled-components', {
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      'trackingId': '-'
    }
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      'name': 'images',
      'path': './src/images/'
    },
    __key: 'images'
  }, {
    resolve: 'gatsby-plugin-react-svg',
  }, 'gatsby-plugin-lodash']
};
