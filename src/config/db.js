const mongoose = require('mongoose');

const connectDB = () => {
  return mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('connected with db'))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDB;
