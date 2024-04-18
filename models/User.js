const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        // match email addresses that follow the common format of username@domain.com
        match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function(value) {
                // Password must contain at least one lowercase letter,
                // one uppercase letter, one number, and one special character
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
            },
            message: props => `${props.value} is not a valid password. Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.`
        }
    }
});

// Create a Mongoose model for the user schema
const User = mongoose.model('User', userSchema);

module.exports = User;
