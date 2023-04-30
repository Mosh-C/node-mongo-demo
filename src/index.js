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
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: 'Angular Course',
    author: 'Mosh',
    tags: ['angular', 'frontend'],
    isPublished: true
  });

  const result = await course.save();
  console.log(result);
};
// createCourse();

const getCourses = async () => {
  // eq   (equal)
  // ne   (not equal)
  // gt   (grather than)
  // gte  (grather than or equal)
  // lt   (less than)
  // lte  (less than or equal)
  // in
  // nin  (not in)

  // or
  // and

  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course
    // .find({ price: { $gte: 10, $lte: 20 } })
    // .find({ price: { $in: [10, 15, 20] } })
    // .find()
    // .or([{ author: 'Mosh' }, { isPublished: true }])

    // Starts with Mosh
    // .find({ author: /^Mosh/ })

    // Ends with Hamedani
    // .find({ author: /Mosh$/i })

    // Contains Mosh
    // .find({ author: /.*Mosh.*/ })

    .find({ author: 'Mosh', isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
  console.log(courses);
};

// getCourses();

const updateCourse = async (id) => {
  try {
    const course = await Course.findById(id);
    if (!course) throw new Error('Course is not found!');

    course.isPublished = true;
    course.author = 'Karam Zomlot'

    const result = await course.save();

    console.log(result);
  }
  catch (err) {
    console.log(err);
  }
}

// updateCourse('644d884c69e1ca8919ad1571')

const updateCourse2 = async (id) => {
  const result = await Course.findByIdAndUpdate(id, {
    $set: {
      author: 'Karam',
      isPublished: false
    }
  }, { new: true });

  console.log(result);
}
updateCourse2('644d884c69e1ca8919ad1571')