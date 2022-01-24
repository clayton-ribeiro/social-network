import { Router } from 'express';
import User from '../models/User';
import * as bcrypt from "bcrypt";
import IUser from '../interfaces/IUser';

const authRouter = Router();

authRouter.post('/register', async (request, response) => {
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request.body.password, salt);
    
        //create new user
        const newUser : IUser = new User({
          username: request.body.username,
          email: request.body.email,
          password: hashedPassword,
        });
    
        //save user and respond
        const user = await newUser.save();
        
        response.status(200).json(user);
      } catch (err) {
        response.status(500).json(err)
      }
});

authRouter.post('/login', async (request, response) => {
    try {
        const user : IUser = await User.findOne({ email: request.body.email });
        !user && response.status(404).json("user not found");
    
        const validPassword = await bcrypt.compare(request.body.password, user.password)
        !validPassword && response.status(400).json("wrong password")
    
        response.status(200).json(user)
      } catch (err) {
        response.status(500).json(err)
      }
});

export default authRouter;