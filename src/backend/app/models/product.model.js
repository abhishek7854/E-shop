const { Schema } = require("mongoose");

const Product = (mongoose) => {

    const productSchema = mongoose.Schema({

        _id: {
            type: Schema.Types.ObjectId
        },
        name: String,
        category: String,
        manufacturer: String,
        availableItems: String,
        price: String,
        imageUrl: {
            type: String,
            default: 'https://rukminim1.flixcart.com/image/800/960/knxiavk0/shoe/a/r/b/6-hkz70-7-reebok-smoky-indigo-vector-original-imag2hwk8h5xq6a3.jpeg?q=50'
        },
        description: {
            type: String,
            default: 'Unique new design with an amalgamation of PU and textile mesh. PU at the rearfoot for motion and protection. Full EVA outsole responsible for traction and responsiveness.'
        }


    }, { timestamp: true })

    const Product = mongoose.model("products", productSchema);
    return Product;
}

module.exports = Product;