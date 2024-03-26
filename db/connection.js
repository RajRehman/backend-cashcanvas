const mongoose = require('mongoose');

const conn = mongoose.connect(process.env.ATLAS_URI)
.then(db => {
    console.log("Database connected successfully");
    return db;
}).catch(err => {
    console.log("Connection Error", err);
})

module.exports = conn; //export the connection so that it can be used in serverfe.js*/