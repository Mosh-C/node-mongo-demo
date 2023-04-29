const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err))

/* 
  SCHEMA TYPES:
    1. String
    2. Number
    3. Date
    4. Buffer : used for storing binary data
    5. Boolean
    6. ObjectID : used for assigning unit identifiers
    7. Array
*/

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [ String ],
  data: { type: Date, default: Date.now },
  isPublished: Boolean
});