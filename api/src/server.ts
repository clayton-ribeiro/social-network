import express from 'express';
import 'express-async-errors';
import routes from './routes';
import 'reflect-metadata';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import registryError from './middlewares/registryError';

const app = express();

dotenv.config();

mongoose.connect(
 process.env.MONGO_URL,
  () => {
    console.log("Connected to MongoDB");
  }
);
app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use(routes);

app.use(registryError);

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
