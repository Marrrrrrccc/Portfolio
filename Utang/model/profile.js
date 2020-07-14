const mongoose = require('mongoose')
const profileSchema = mongoose.Schema({
    name: String,
    credits: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Credit",
        }
    ]
})

const Profile = mongoose.model('Profile', profileSchema)
module.exports = Profile;