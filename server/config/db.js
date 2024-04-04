const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const dbConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log(`Database Connection Success: ${conn.connection.host}`);
    } catch (e) {
        console.log(e);
    }
};

module.exports = dbConnection;
