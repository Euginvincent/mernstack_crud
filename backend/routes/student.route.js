let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
  // model = express.Model();
  const fileUpload = require('express-fileupload');
  
  var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

  
let studentSchema = require('../models/Student');

router.route("/paginationexample").get(function(req, res) {
  var aggregateQuery = students.aggregate();

  students.aggregatePaginate(aggregateQuery, { page: 3, limit: 5 }, function(
    err,
    result
  ) {
    if (err) {
      console.err(err);
    } else {
      res.json(result);
    }
  });
});

// CREATE Student
router.use(fileUpload()).route('/create-student').post((req, res, next) => {
  
  let sampleFile;
  let uploadPath;

  // if (!req.files || Object.keys(req.files).length === 0) {
  //   return res.status(400).send('No files were uploaded.');
  // }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.profileimg;
    uploadPath = __dirname + '/Public/' + sampleFile.name;

  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

   let requestdata = req.body
   requestdata.profileimg = sampleFile.name
   studentSchema.create(requestdata, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
  });  
});

// READ Students
router.route('/').get((req, res) => {  
  studentSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single Student
router.route('/edit-student/:id').get((req, res) => {
  studentSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Student
router.route('/update-student/:id').put((req, res, next) => {  
   studentSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Student updated successfully !')
    }
  })
  
})

// Delete Student
router.route('/delete-student/:id').delete((req, res, next) => {
  studentSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;