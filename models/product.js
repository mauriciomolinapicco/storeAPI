const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'product name must be provided'],
    },
    price: {
        type:Number,
        required: [true, 'price must be provided']
    },
    featured: {
        type:Boolean,
        default:false
    },
    rating: {
        type:Number,
        default:4.5
    },
    createdAt: {
        type:Date,
        default: Date.now(), //Automaticamente se agrega el dattime del momento
    },
    company: {
        type:String,
        enum: {  //i list the possible options for the field
            values:['ikea','liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supportes', //message if the user chooses a different option
        }
       
    }
})

module.exports = mongoose.model("Product", ProductSchema);