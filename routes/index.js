var express = require('express');
var router = express.Router();
var createError = require('http-errors');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* redirect to a url from the id. */
router.get('/:id', async function(req, res, next) {
  /**
   * @type {import("quick.db").QuickDB}
   */
  var db = req.app.locals.db;

  if (!await db.has(req.params.id)) {
    next(createError(404));
  }

  res.redirect(await db.get(req.params.id));
});

module.exports = router;
