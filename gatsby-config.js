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
          'Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i',
          'Lato:100,100i,300,300i,400,400i,700,700i,900,900i',
          'Quicksand:300,400,500,700',
          'PT+Serif:700',
          'Source+Code+Pro:400',
          'Material+Icons',
        ]
      }
    }
  }]
};
