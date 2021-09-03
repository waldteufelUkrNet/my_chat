const mongoose = require('../libs/mongoose'),
      Schema   = mongoose.Schema;

let schema = new Schema({
  interlocutors: { // співрозмовники
    type: Array,
    required: true
  },
  chat: {
    type: Array
  }
});

exports.MonoChat = mongoose.model('MonoChat', schema);