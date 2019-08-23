const routes = require('next-routes');

module.exports = routes()
  .add('reset', '/reset/:id/:token');
