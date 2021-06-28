var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var crypto = require('crypto');
var fs = require('fs');
var path = require('path');

var model = require('../models/index');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

/* GET searchName */
router.get('/searchName', (req, res, next) => {
  console.log(req.query);
  searchName = req.query.search;
  console.log('searching for ' + searchName);
  model.getName(searchName, (result) => {
    res.render('search', { images: result });
  });
});

/* GET searchHash */
router.get('/searchHash', (req, res, next) => {
  console.log(req.query);
  searchHash = req.query.search;
  console.log('searching for ' + searchHash);
  model.getHash(searchHash, (result) => {
    res.render('search', { images: result });
  });
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
    fs.rename(old_path, new_path, (err) => {
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
      fs.unlink(new_path);
      return;
    }
    var md5sum = crypto.createHash('md5');
    md5sum.update(JSON.stringify(d));
    var h = md5sum.digest();
    d.hash = h.toString('hex');
    model.post(d, (err, img) => {
      if (err) {
        next(err);
        fs.unlink(new_path);
        return;
      }
    });
    res.redirect('/');
  });
});

module.exports = router;
