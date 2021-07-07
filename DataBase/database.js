const mongoose = require("mongoose")
mongoose.Promise = require("bluebird");

exports.connectDb = async () => {
    const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.x0f7n.mongodb.net`;
    try{
        await mongoose.connect(uri, {
            keepAlive: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            poolSize: 10,
            w: "majority",
            authSource: "admin",
            dbName: "test",
          });
    }
    catch(error) {
        console.log(error)
    }
}
