const router = require('express').Router()
const multer = require('multer');
const Product = require('../models/Product')

 const { getAll,remove,getSingleProduct,update,getAllbystatus} = require('../controllers/productController')
const isAuth = require('../config/auth')
const isAdmin = require('../config/authencate')
const { serverError } = require('../util/error')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    //console.log('fill',file);
    var filetype = '';
    if (file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if (file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if (file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'image-' + Date.now() + '.' + filetype);
  }
});
const upload = multer({ storage: storage });



router.get('/managestatus',getAllbystatus)




router.post('/', upload.single('Media'), (req, res, next) => {

  let { Title,
    Status,
    Media,
    } = req.body

  //console.log(req.body.onedayDelivery)
  if (!req.file) {
    res.status(500);
    return next(err);
  } else {

      // console.log(req.file)
      let images = req.protocol + '://' + req.get('host') + '/' + req.file.filename
     
      let product = new Product({
        Title: Title,
        Status: Status ,
        Media: images,
      })

      product.save()
        .then(products => {
          // console.log('trans',books)
          res.status(201).json({
            message: 'created successfully',
            products,
            productId: products._id
          })
        })
        .catch(error => console.log(error))


    

  }

})



router.get('/', getAll)


router.delete('/:productId', remove)

router.get('/:productId', getSingleProduct)

router.put('/update/:productId', update)

router.put('/single/:productId', upload.single('Media'), (req, res, next) => {
  console.log('nameonly ', req.body.product)

  console.log('newfile', req.file)
  console.log('braidup', req.params.productId)
  let { productId } = req.params



  let singleImage = req.protocol + '://' + req.get('host') + '/' + req.file.filename;
  Product.findOneAndUpdate({ _id: productId },
    {
      $set:
      {

        Media: singleImage

      }
    }, { new: true })
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: 'Updated Successfully',
        product: result
      })
    })
    .catch(error => serverError(res, error))



})





module.exports = router;