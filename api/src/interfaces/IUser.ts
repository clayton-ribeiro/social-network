import mongoose, { Document } from 'mongoose';
export default interface IUser extends Document {
    username: string,
    email: string,
    password:string,
    profilePicture:string,
    coverPicture:string,
    followers: Array<Number>,
    followings: Array<Number>,
    isAdmin: Boolean,
    desc:string,
    city:string,
    from:string,
    relationship:Number,
    _doc: any
  }