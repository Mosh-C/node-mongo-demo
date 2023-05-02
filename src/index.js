const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err))

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

const getCourses = async () => {

  const pageNumber = 2;
  const pageSize = 10;

  const courses = await Course

    .find({ author: 'Mosh', isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
  console.log(courses);
};

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

const updateCourse2 = async (id) => {
  const result = await Course.findByIdAndUpdate(id, {
    $set: {
      author: 'Karam',
      isPublished: false
    }
  }, { new: true });

  console.log(result);
}

const removeCourse = async (id) => {
  const result = await Course.findByIdAndRemove(id);

  console.log(result);
}

removeCourse('644d884c69e1ca8919ad1571');

