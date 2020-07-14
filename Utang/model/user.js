const mongoose = require('mongoose')
const LocalStrategy = require('passport-local-mongoose');
const userSchema = mongoose.Schema(
    {
        username: String,
        password: String,
    }
);
userSchema.plugin(LocalStrategy);
const User = mongoose.model('User', userSchema);
module.exports = User;