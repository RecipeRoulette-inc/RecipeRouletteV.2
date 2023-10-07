const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

//user schema
const userSchema = new Schema({
    userName: {type: String, required:true},
    password: {type: String, required: true},
    savedRecipes: []
});
// userSchema.pre('save', function(next) {
//     this.password = bcrypt.hashSync(this.password, 10);
//     return next();
// })

userSchema.pre('save', async function (next) {
    console.log('userSchema.pre')
    if (this.isModified('password')) {
        this.password = await bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
    }
    return next();
})

//recipe schema

// const recipeSchema = new Schema({
//     name: {type: String, required: true}, 
//     cuisine: {type: String},
//     //level: {type: String},
//     imageUrl: {type: String, required: true},
//     description: {type: String}, 
//     dietaryRestrictions: [String],
//     ingredients:[{type: Object, required: true}],
//     instructions: {type: String, required: true},
//     author: {type: String, required: true}
// });

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};