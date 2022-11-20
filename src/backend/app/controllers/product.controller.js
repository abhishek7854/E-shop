const { Product } = require('../models')

const getAllProducts = (req, res) => {

    if (req.query.status === undefined) {
        Product.find().then(data => {
            res.status(200).json({ success: true, productData: data })
        }).catch((err) => {
            res.status(500).json({ success: false, msg: err })
        })
        return;
    }

}

const getProductCategory = async (req, res) => {
    const category = req.params.category;
    const productCategory = await Product.findOne({ category })
    if (productCategory) {
        res.status(200).json({ success: true, productCategory });
    }
    else {
        res.status(404).json({ success: false, msg: "Something Went Wrong" })
    }

}

const getProductByID = (req, res) => {

    const id = req.params.id;
    Product.findOne({ _id: id }).then(data => {
        if (!data)
            res.status(404).send({ message: "No Product found for ID -" + id });
        else {
            res.send(data);
        }
    })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Shows for movie with id=" + id });
        });

}






module.exports = { getAllProducts, getProductCategory, getProductByID };