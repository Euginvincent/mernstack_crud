const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

let studentSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  rollno: {
    type: Number
  },
  profileimg: {
    type: String
  }
}, {
    collection: 'students'
  })

  studentSchema.plugin(aggregatePaginate);

module.exports = mongoose.model('Student', studentSchema)