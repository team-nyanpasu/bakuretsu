var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var crypto = require('crypto');
var fs = require('fs');
var path = require('path');

var models = require('../models/models');
const model = models.getModel();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET search */
router.get('/search_name', (req, res, next) => {
  console.log(req.query);
  searchName = req.query.search;
  console.log('searching for ' + searchName);
  nameResults = model.getName(searchName);
  res.render('search', { images: nameResults });
});

router.get('/search_hash', (req, res, next) => {
  console.log(req.query);
  searchHash = req.query.search;
  console.log('searching for ' + searchHash);
  hashResult = model.getHash(searchHash);
  res.render('search', { images: hashResults });
});

/* POST fileupload */
router.post('/fileupload', (req, res, next) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    old_path = files.fileupload.path;
    filename = path.basename(old_path);
    new_path = './public/images/' + path.basename(old_path);
    fs.rename(old_path, new_path, function (err) {
      if (err) {
        next(err);
        fs.unlink(old_path);
        return;
      }
    });
    var d = {
      path: 'images/' + filename,
      fullpath: new_path,
      name: files.fileupload.name,
      time: Date.now()
    }
    if (!d.name) {
      next(console.log("Error file has no name"));
      fs.remove(new_path);
      return;
    }
    var md5sum = crypto.createHash('md5');
    md5sum.update(JSON.stringify(d));
    var h = md5sum.digest();
    d.hash = h.toString('hex');
    model.post(d, function (err, img) {
      if (err) {
        next(err);
        fs.remove(new_path);
        return;
      }
    });
    res.redirect('/');
  });
});

module.exports = router;
