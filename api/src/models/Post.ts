import mongoose, { Schema } from 'mongoose';
import IPost from '../interfaces/IPost';

const PostSchema: Schema = new Schema({
    userId: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        max: 500,
      },
      img: {
        type: String,
      },
      likes: {
        type: Array,
        default: [],
      },
    },
    { timestamps: true });

    export default mongoose.model<IPost>('Post', PostSchema);