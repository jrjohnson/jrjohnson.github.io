'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    postcssOptions: {
      compile: {
        enabled: true,
        plugins: [
          { module: require('cssstats') },
          { module: require('postcss-stats-reporter') },
          { module: require('postcss-reporter') },
          { module: require('postcss-nesting') },
        ]
      },
      filter: {
        enabled: true,
        plugins: [
          { module: require('autoprefixer') },
        ]
      }
    }
});

  return app.toTree();
};
