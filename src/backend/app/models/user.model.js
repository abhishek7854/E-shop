// const mongoose=require('mongoose')

const validator = require('validator');
const bcrypt = require('bcryptjs')

const User = (mongoose) => {

    //We have to Make Schema 
    const userSchema = mongoose.Schema({
        _id: Number,
        firstName: String,
        lastName: String,
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: [true, "Please Enter Your email"],
            unique: true,
            validate: [validator.isEmail, 'Invalid email-id format!']

        },
        contactNumber: {
            type: String,
            minLength: [10, 'Invalid contact number!']
        },
        password: {
            type: String,
            required: [true, "Please enter your password"],
            minLength: [6, 'Password must be greater than 6 characters'],
            select: false
        },
        role: {
            type: String,
            default: 'user'
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
        //resetPasswordToken:String,
        //   resetPasswordExpire:Date

    }, { timestamp: true });

    //For Encryption of password 
    userSchema.pre("save", async function (next) {
        if (this.isModified("password")) {
            next();
        }

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    });

    //For decrypting the password

    userSchema.methods.matchPassword = async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
    }

    const User = mongoose.model("users", userSchema);

    return User;
}

module.exports = User;