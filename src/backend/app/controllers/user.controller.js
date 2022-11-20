const { User } = require('../models');
// const asyncHandler = require('express-async-handler');
// const { generateToken } = require('../utils/generateToken') 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const signUp = async (req, res) => {

    try {

        //Get user Input
        const { _id, email, password, firstName, lastName, contactNumber, role } = req.body;

        //Validate user Input  
        if (!(email && password && firstName && lastName)) {
            res.status(400).send("All input Required")
        }

        //Check if user already exists 
        const oldUser = await User.find({ email });

        if (oldUser) {
            return res.status(400).send("User Already Exist. Please Login")
        }

        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        //Create  user in our database 

        const user = await User.create({
            _id,
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: encryptedPassword,
            contactNumber,
            role

        });

        //Create Token  
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "4h",
            }
        );

        //save user token  
        user.token = token;

        //return new user 
        res.status(200).json(user);

    } catch (err) {
        console.log(err);
    }
}





const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "4h",
                }
            );

            //save user token  
            user.token = token;
            res.status(200).json(user);
        }

        res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err)
    }
}






// // Validate request
// if (!req.body.email && !req.body.password) {
//     res.status(400).send({ message: "Please provide email and password to continue." });
//     return;
// }


// const user = new User({
//     firstName: req.body.firstName,
//     lastName: req.body.lastName,
//     name: req.body.firstName + req.body.lastName,
//     email: req.body.email,
//     password: req.body.password,
//     contactNumber: req.body.mobile_number,
//     role: req.body.role ? req.body.role : 'user',
// });
// user
//     .save(user)
//     .then(data => {
//         res.send(data);
//     })
//     .catch(err => {
//         res.status(500).send({
//             message:
//                 err.message || "Some error occurred, please try again later."
//         });
//     });
// }


module.exports = { signUp, login }





