import mongoose from 'mongoose';
import { config } from '../config';

export const dbConnect = ()=>{ 
    mongoose.connect(config.db.connect_string,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('Mongo DB connected!'))
    .catch((e)=> console.log('Mongo DB connection failed!', e))
};