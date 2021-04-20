let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
  const fileUpload = require('express-fileupload');
  
  var path = require('path');
  // router.use(express.static(path.join(__dirname, 'Public')));
  // router.use('/img',express.static(path.join(__dirname, 'Public')));
  router.use(express.static(path.resolve('./routes/Public')));

// Student Model
let studentSchema = require('../models/Student');

// express().use(fileUpload());

// CREATE Student
router.use(fileUpload()).route('/create-student').post((req, res, next) => {
  console.log(req.body);
  console.log(req.body.profileimg);
  // res.json(req.body);
  
  let sampleFile;
  let uploadPath;

  // if (!req.files || Object.keys(req.files).length === 0) {
  //   return res.status(400).send('No files were uploaded.');
  // }

  console.log(req.files);

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.profileimg;
    uploadPath = __dirname + '/Public/' + sampleFile.name;
    console.log(uploadPath);
  
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

   // res.send('File uploaded!');
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