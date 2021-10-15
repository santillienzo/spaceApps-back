const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const adminUserSchema = new mongoose.Schema({
    username:{
        type: String,
        trim: true,
        maxlength: 32,
        require: true
    },
    hashed_password:{
        type: String,
        require: true
    },
    salt: String
},
{timestamps: true}
)

adminUserSchema.virtual('password')
.set(function(password){
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
})
.get(function(){
    return this._password;
})

adminUserSchema.methods = {
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password){
        if(!password){
            return '';
        }

        try {
            return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex')
        } catch(error){
            return '';
        }
    }
}

module.exports = mongoose.model ('AdminUser', adminUserSchema)