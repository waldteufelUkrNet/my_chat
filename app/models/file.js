const mongoose = require('../libs/mongoose'),
      Schema   = mongoose.Schema;

let schema = new Schema({
  fileid: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  fileext: {
    type: String,
    required: true
  }
});

exports.File = mongoose.model('File', schema);