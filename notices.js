'use strict';

var vsprintf = require("sprintf").vsprintf;

module.exports = function(req, res, next) {

  var notices = {

    get: function() {
      var all = req.session.notices;
      if (!all)
        all = [];
      req.session.notices = null;
      return all;
    },

    add: function(kind, m) {
      var all = req.session.notices;
      if (!all)
        all = [];
      // Format message
      var message = m,
          params = args.slice(2);
      if (req.i18n && req.i18n.__ && typeof (req.i18n.__ == 'function')) {
        message = req.i18n.__.apply(null,[m].concat(params));
      } else {
        message = vsprintf(m, params);
      }
      // Push to session
      all.push({
        kind: kind,
        msg: message
      });
      req.session.notices = all;
      return notices;
    },

    info: function(msg) {
      return notices.add('info', msg);
    },

    warn: function(msg) {
      return notices.add('warn', msg);
    },

    error: function(msg) {
      return notices.add('error', msg);
    },

    send: function() {
      res.json({ notices: notices.get() });
      return notices;
    }

  };

  res.notices = res.locals.notices = notices;

  next();
};