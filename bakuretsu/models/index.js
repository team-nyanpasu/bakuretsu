const yaml = require('js-yaml');
const fs = require('fs');

const mongoose = require('mongoose')

class MongoModel {
  constructor() {
    mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
    this.db = mongoose.connection;
    this.db.on('error', console.error.bind(console, 'connection error:'));
    this.db.once('open', function() {
      console.log('mongoose connected');
    });
    this.ImageData = mongoose.model('ImageData',
      new mongoose.Schema({
        path: String,
        fullpath: String,
        name: String,
        time: Date,
        hash: String
    }));
  }
  getName(request, callback) {
    this.ImageData.find({ name: request }, (err, results) => {
      if (err) { console.log(err); callback(["dummy"]); }
      callback(results.map(a => a.path));
    });
  }
  getHash(request, callback) {
    this.ImageData.find({ hash: request }, (err, results) => {
      if (err) { console.log(err); callback(["dummy"]); }
      callback(results.map(a => a.path));
    });
  }
  post(request, handler) {
    let img = new this.ImageData(request);
    console.log(img);
    img.markModified();
    img.save(handler);
  }
}

try {
  let fileContents = fs.readFileSync('./config.yml', 'utf8');
  var config = yaml.load(fileContents);
} catch (e) {
  console.log(e);
}

function getModelConstructor() {
  constructors = {
    mongodb: MongoModel
  };
  if (config.db in constructors) return constructors[config.db];
  else return MongoModel;
}

function getModel() {
  return new (getModelConstructor())();
}

module.exports = getModel();