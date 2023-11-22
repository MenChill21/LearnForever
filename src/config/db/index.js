const mongoose = require('mongoose');
 function connect(){
    mongoose.connect('mongodb://127.0.0.1:27017/education_dev')
        .then(() => console.log('Connected!'))
        .catch(()=> console.log('Connect failure!'))
 }
 module.exports={ connect }