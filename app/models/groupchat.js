const mongoose = require('../libs/mongoose'),
      Schema   = mongoose.Schema;

let schema = new Schema({
  interlocutors: { // співрозмовники
    type: Array,
    required: true
  },
  meta: {
    type: Object,
    required: true
  },
  chat: {
    type: Array
  }
});

exports.GroupChat = mongoose.model('GroupChat', schema);