 const express = require('express'),
 path = require('path'),
 bodyParser = require('body-parser'),
 cors = require('cors'),
 mongoose = require('mongoose');
 
 var mongoDatabase = 'mongodb://localhost:27017/employeeDetails';
 
 const app = express();
 mongoose.Promise = global.Promise;
 
 mongoose.connect(mongoDatabase, { useNewUrlParser: true }).then(
 () => { console.log('Database is connected') },
 err => { console.log('There is problem while connecting database ' + err) }
 );
 
 const employeeRoutes = require('../Routes/Employee.route');
 
 app.use(bodyParser.json());
 
 app.use(cors());
 
 const port = process.env.PORT || 4000;
 
 app.use('/employees', employeeRoutes);
 
 const server = app.listen(port, function () {
 console.log('Server Lisening On Port : ' + port);
 });