require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../resources/users/user.model');
const bcrypt = require('bcrypt');

// eslint-disable-next-line no-sync
const passwordToSave = bcrypt.hashSync('admin', 10);

const admin = new User({
  name: 'admin',
  login: 'admin',
  password: passwordToSave
});

const connectionToDB = callback => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    await db.dropDatabase();
    admin.save();
    console.log('Connected to DB');
    callback();
  });
};

module.exports = { connectionToDB };
