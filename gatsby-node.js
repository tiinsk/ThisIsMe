const path = require('path');

exports.createPages = ({ actions }) => {
  const { createPage } = actions;
  const locales = ['fi', 'en'];

  locales.forEach(locale => {
    const prefix = locale === 'en' ? '' : `/${locale}`;
    createPage({
      path: `${prefix}/`,
      component: path.resolve('./src/templates/index.js'),
      context: { locale }
    });
  });
};
