var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var crypto = require('crypto');

const mongoose = require('mongoose')

// schema setup

const ImageData = mongoose.model('ImageData',
  new mongoose.Schema({
    data: {
      path: String,
      name: String,
      time: Date
    },
    hash: String
}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST fileupload */
router.post('/fileupload', (req, res, next) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    var d = {
      path: files.fileupload.path,
      name: files.fileupload.name,
      time: Date.now()
    }
    if (!d.name) {
      next(console.log("Error file has no name"));
      return;
    }
    var md5sum = crypto.createHash('md5');
    md5sum.update(JSON.stringify(d));
    var h = md5sum.digest();
    img = new ImageData({ data: d, hash: h });
    console.log(img);
    img.markModified();
    img.save(function (err, img) {
      if (err) {
        next(err);
        return;
      }
    });
    result = { data: d, hash: h.toString('hex') };
    res.json(result);
  });
});

module.exports = router;
