import dotenv from 'dotenv';
import colors from 'colors'; // eslint-disable-line no-unused-vars
import User from './models/userModel.js';
import Certificate from './models/certificateModel.js';
import Notification from './models/notificationModel.js';
import Blog from './models/blogModel.js';
import connectDB from './config/db.js';
import transactions from './data/transaction.js';
import Transaction from './models/transactionModel.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // await User.deleteMany()

    await Transaction.insertMany(transactions);

    console.log('Data Imported!'.green.inverse);
    process.exit(0);
  } catch (error) {
    console.log(`${error}`.red.inverse.underline);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Certificate.deleteMany();
    await Notification.deleteMany();
    await Blog.deleteMany();
    await Transaction.deleteMany();

    console.log('Data Destroyed!'.red.inverse.bold);
    process.exit(0);
  } catch (error) {
    console.log(`${error}`.red.inverse.underline);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
