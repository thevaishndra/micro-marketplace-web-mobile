import {User} from '../models/User.models.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    return jwt.sign({id : userId}, process.env.JWT_SECRET, {
        expiresIn : '7d',
    });
};

const registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;
    
        const userExists = await User.findOne({
            email
        });
        if(userExists) {
            return res.status(400).json({message : "User already exists"});
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const createdUser = await User.create({
            name,
            email,
            password : hashedPassword
        });
    
        if (!createdUser) {
            return res.status(500).json({message : "Something went wrong while registering user"})
          
        }

        res.status(201).json({
            _id : createdUser._id,
            name : createdUser.name,
            email : createdUser.email,
            token : generateToken(createdUser._id),
        });
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};

const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
          });
        } else {
          res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export {registerUser, loginUser};

//Generate JWT
/*register controller - 
 get user details from frontend,
 Checks if user already exists,
 hash password using bcrypt,
 create user object in db,
 check for user creation,
 sends response
 */
/*login controller - 
 get user details from frontend,
 find the user in db,
 check if password is correct or not,
 if correct send response with user details and token,
 if not correct send error response
*/
