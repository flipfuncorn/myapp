const mongoose = require('mongoose');

const url = 'mongodb+srv://root:1234@cluster0-ilpdw.mongodb.net/maximapp';

const connectOptions = {
    // automatically try to reconnect when it loses connection
    autoReconnect: true,
    // reconnect every reconnectInterval milliseconds
    // for reconnectTries times
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    // change default collection.ensureIndex on collection.createIndex.
    useCreateIndex: true,
    // flag to allow users to fall back to the old
    // parser if they find a bug in the new parse
    useNewUrlParser: true,
    useUnifiedTopology: true
};

module.exports = mongoose.createConnection(url, connectOptions);