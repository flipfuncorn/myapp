const { Schema } = require('mongoose');
const connections = require('./connection');

const UserSchema = new Schema(
    {
        login: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            trim: true
        },
        password: {
           type: String,
           trim: true
        }
    },
    {
        collection: 'usermodel',
        versionKey: false
    }
);

module.exports = connections.model('UserModel', UserSchema);