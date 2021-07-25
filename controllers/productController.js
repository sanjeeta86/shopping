const Product = require('../models/Product')
const { serverError } = require('../util/error')
const productValidator = require('../validator/productValidator')
module.exports = {
   
    async getAllbystatus(req,res){
        let alldata = await Product.find()
      let openstatus = await Product.find({Status:'open'})
      let inprogresstatus = await Product.find({Status:'in progress'})
      let completedstatus = await Product.find({Status:'completed'})
      if(openstatus || inprogresstatus || completedstatus){
        res.status(200).json({
            openstatus: openstatus,
            inprogresstatus: inprogresstatus,
            completedstatus:completedstatus
            
        })
      }
    },
    getAll(req, res) {

            Product.find({})
                .populate('category')
                .populate('subcategory')
                .then(products => {
                    if (products.length === 0) {
                        return res.status(200).json({
                            message: 'No Product Found'
                        })
                    } else {
                        res.status(200).json({
                            products: products,
                            count: products.length
                            
                        })
                    }
                })
                .catch(error => serverError(res, error))


        




    },

    //get single 
    getSingleProduct(req, res) {
        let { productId } = req.params
        Product.findById(productId)
            .then(product => {
                if (!product) {
                    res.status(200).json({
                        message: 'No Product Found'
                    })
                } else {
                    res.status(200).json(product)
                }
            })
            .catch(error => serverError(res, error))
    },



    getProductsByCategoryId(req, res) {
        
        let { productId } = req.params

        console.log('kol',req.params)

        console.log(productId)

        Product.find({ 'category': productId })
            .populate('subcategory')
            .populate('category')
            
            .then(product => {
                 console.log(product)
                if (product.length===0) {
                    res.status(200).json({
                        success: false,
                        message: 'No Product Found'
                    })
                } else {
                    res.status(200).json({
                        success: true,
                        product,
                        postSize: product.length
                    })
                }
            })
            .catch(error => serverError(res, error))
    },


    //update 
    update(req, res) {
        // console.log(req.body)
        let { productId } = req.params
        Product.findOneAndUpdate({ _id: productId }, { $set: req.body }, { new: true })
            .then(result => {
                res.status(200).json({
                    message: 'Updated Successfully',
                    product: result
                })
            })
            .catch(error => serverError(res, error))
    },

    //remove 
    remove(req, res) {
        let { productId } = req.params
        Product.findOneAndDelete({ _id: productId })
            .then(result => {
                res.status(200).json({
                    message: 'Deleted Successfully',
                    ...result._doc
                })
            })
            .catch(error => serverError(res, error))
    },


   

}