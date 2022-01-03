const mongoose = require('mongoose');
mongoose.connect(
  process.env.MONGODB_URL || 'mongodb://localhost:27017/JobFinder',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (err) throw err;
    console.log('MongoDB database connected');
  },
);
