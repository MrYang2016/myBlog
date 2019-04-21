const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

module.exports = mongoose.model('doc', new Schema({
  time: String,
  hashName: String,
  fileName: String,
  intro: String,
  content: String,
  ips: { type: Array, default: [] },
  markdown: { type: String, default: '' },
}));