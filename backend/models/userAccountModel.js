const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userAccountSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: { 
        type: Number, 
        default: 0 } 
        // 0 for registered user, 1 for admin
}, {
    timestamps: true,
});

const UserAccount = mongoose.model('UserAccount', userAccountSchema);

module.exports = UserAccount;
