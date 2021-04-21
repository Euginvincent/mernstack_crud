const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var mongoosePaginate = require('mongoose-paginate');

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


module.exports = mongoose.model('Student', studentSchema)