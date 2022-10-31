var mongoose = require('mongoose');
    bcrypt = require('bcrypt')
    Schema = mongoose.Schema;

var userSchema = new Schema({
    fullName: {
        type: String,
        trim: true,
        required: 'Kindly enter the your name'
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.hash_password)
}


module.exports = mongoose.model('User', userSchema);
