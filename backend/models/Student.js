const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

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
  studentSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Student', studentSchema)