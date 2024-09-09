import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field cannot be empty'],
    },
    email: {
        type: String,
        required: [true, 'Email field cannot be empty'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password field cannot be empty'],
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;