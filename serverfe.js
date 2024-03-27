const express = require('express');
const app = express(); // to initialize the app as an express app
const cors = require('cors');

require('dotenv').config({path : "./config.env"});
const port = process.env.PORT || 5000;

//use middleware
app.use(cors());
app.use(express.json());

//mongoDB connection

const con = require('./db/connection.js');

//using routes
app.use(require('./routes/route.js'));

// This should be after other middleware and routes (added new lines 20-26)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../clientfe/build')));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../clientfe', 'build', 'index.html'));
    });
  }

con.then(db => {
    if(!db) return process.exit(1);

    //listen to the http server
    app.listen(port, () => {
        console.log(`Server is running on port: http://localhost:${port}`)
    })

    app.on('error', err => console.log(`Failed to connect with HTTP server:${err}`));
    //below line is for if there is an error in mongoDB connection
}).catch(error => {
    console.log(`Connection Failed! ${error}`);
})





