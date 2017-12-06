const mongoose = require('mongoose');

// make new user modal , email - require it - trim it - minlength 1
const User = mongoose.model('User', {
    email: { type: String, required: true, minlength: 1, trim: true }
});

// const newUser = new User({ email: 'kwn791122@gmail.com' })
// .save().then(
//     doc => console.log(`Save user: `, doc),
//     err => console.log('Unable to save user email', err)
// );

module.exports = { User };