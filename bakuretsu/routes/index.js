var express = require('express');
var router = express.Router();
var formidable = require('formidable');
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
    oldPath = files.fileupload.path;
    parsedPath = path.parse(oldPath);
    newPath = './public/images/' + parsedPath.base;
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        next(err);
        fs.unlink(oldPath);
      }
    });
    let request = {
      path: 'images/' + parsedPath.base,
      fullpath: newPath,
      name: path.parse(files.fileupload.name).name
    }
    model.post(request, (err, img) => {
      if (err) {
        next(err);
        fs.unlink(newPath);
      }
    });
    res.redirect('/');
  });
});

module.exports = router;
