/*
THIS PROGRAM IS ONLY FOR FILLING THE DB
*/ 

require('dotenv').config()

const connectDB = require('./db/connect');
const Product = require('./models/product');

const jsonProducts = require('./products.json');

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany(); //make sure the db is empty
        await Product.create(jsonProducts); //le paso jsonProducts que es el array con todos os productos
        console.log('Success');

        process.exit(0); //i terminate the process because i dont need to keep running this program
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start();