require('dotenv').config();
const mongoose = require('mongoose');

const connectionToDB = callback => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    await db.dropDatabase();
    console.log('Connected to DB');
    callback();
  });
};

module.exports = { connectionToDB };
