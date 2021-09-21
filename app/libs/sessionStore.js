const config            = require('../config'),
      mongoSessionStore = require('connect-mongo'),            // save cookies in db
      sessionStore      = mongoSessionStore.create({ mongoUrl: config.get('mongoose:uri') });

module.exports = sessionStore;