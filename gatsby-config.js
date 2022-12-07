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
  }, 'gatsby-plugin-lodash', {
    resolve: 'gatsby-plugin-web-font-loader',
    options: {
      google: {
        families: [
          'Open+Sans:300,400,700',
          'Lato:300,400,700',
          'Quicksand:300,400,700',
          'PT+Serif:700',
          'Source+Code+Pro:400',
          'Material+Icons',
        ]
      },
      timeout: 20000 // = 20 seconds
    }
  }]
};
