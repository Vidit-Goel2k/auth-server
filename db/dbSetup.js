const mongoose = require('mongoose');

const connectToDatabase = async (mongoDbURI) =>  {
    try {
        await mongoose.connect(mongoDbURI)
        console.log("Database Connected")
        return true
    } catch (error) {
        console.error("Error Connecting to Database", error)
        return false
    }
}

module.exports = connectToDatabase