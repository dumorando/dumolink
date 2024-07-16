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

  if (!req.query.encoding) {
    res.render('done', { title: 'Done', id, appname: req.app.locals.brand.appName, creator: req.app.locals.brand.appCreator });
  } else {
    switch (req.query.encoding) {
      case "text":
        return res.send(id);
      case "json":
        return res.json({ id });
      case "xml":
        res.header('Content-Type', 'application/xml');
        return res.send(`
<dumolink>
      <id>${id}</id>
</dumolink>
        `);
    }
  }
});

router.get('/link', async function (req, res, next) {
  if (!req.query.id || !req.query.encoding) return next(createError(400));

  /**
   * @type {import("quick.db").QuickDB}
   */
  var db = req.app.locals.db;

  if (!await db.has(req.query.id)) return next(createError(404));

  var url = await db.get(req.query.id);

  switch (req.query.encoding) {
    case "text":
      return res.send(url);
    case "json":
      return res.json({ url });
    case "xml":
      res.header('Content-Type', 'application/xml');
      return res.send(`
<dumolink>
    <url>${url}</url>
</dumolink>
      `);
  }
});

module.exports = router;
