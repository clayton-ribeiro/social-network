import mongoose, { Document } from 'mongoose';
export default interface IPost extends Document {
    userId: string,
    desc: string,
    img: string,
    likes: Array<Number>,
  }