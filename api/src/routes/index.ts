import { Router } from 'express';
import authRouter from './auth.routes';
import postRouter from './post.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use("/api/auth", authRouter);
routes.use("/api/users", usersRouter);
routes.use("/api/posts", postRouter);


export default routes;
