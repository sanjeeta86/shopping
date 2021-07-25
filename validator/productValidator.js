const validator = require('validator')

const validate = product => {
    let error = {}

    if (!product.name) {
        error.name = 'Please Provide Product Name'
    }
    if (!product.price) {
        error.price = 'Please Provide Product Price'
    }
    if (!product.quantity) {
        error.quantity = 'Please Provide Product Quantity'
    }


    if (!product.vendor) {
        error.vendor = 'Please Provide Vendor Id'
    }
    if (!product.category) {
        error.category = 'Please Provide Category Id'
    }
    if (!product.brand) {
        error.brand = 'Please Provide Brand Id'
    }
    return {
        error,
        isValid: Object.keys(error).length === 0
    }
}

module.exports = validate