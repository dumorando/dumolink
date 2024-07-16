var express = require('express');
var crypto = require('crypto');
var createError = require('http-errors');
var router = express.Router();

/* route creation.
   TODO: make this a post. */
router.get('/create', async function(req, res, next) {
  if (!req.query.url) return next(createError(400));

  /**
   * @type {import("quick.db").QuickDB}
   */
  var db = req.app.locals.db;
  var id = crypto.randomUUID().substring(0, 8); //theres surely better ways to do this but i like this method

  await db.set(
    id,
    req.query.url
  );

  res.render('done', { title: 'Done', id });
});

module.exports = router;
