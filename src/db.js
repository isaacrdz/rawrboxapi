import mongoose from 'mongoose';
import config from './config';

export default callback => {
  // mongoose.Promise = Global.promise;
  let db = mongoose.connect(config.mongoUrl);
  callback(db);
}
