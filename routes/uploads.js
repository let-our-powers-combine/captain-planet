const multer = require('multer')
const multerS3 = require('multer-s3')

const googleVisionApi = require('../controllers/googleVision')
const AWSRekognitionController = require('../controllers/AWSRekognition')

const uploadController = require('../controllers/uploads')

module.exports = (app, s3, passport) => {
  const uploadUnprocessed = multer({
    storage: multerS3({
      s3,
      bucket: 'captain-planet-user-images-2',
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function(req, file, cb) {
        cb(null, { fieldName: file.fieldname })
      },
      key: function(req, file, cb) {
        cb(null, `${req.user.id}/${Date.now()}-${file.originalname}`)
      }
    }),
    limits: { fileSize: 10000000, files: 3 }
  })

  // const uploadProcessed = multer({
  //   storage: multerS3({
  //     s3,
  //     bucket: 'captain-planet-user-images-2',
  //     metadata: function(req, file, cb) {
  //       cb(null, { fieldName: file.fieldname })
  //     },
  //     key: function(req, file, cb) {
  //       cb(null, `${req.user.id}/${Date.now()}`)
  //     }
  //   }),
  //   limits: { fileSize: 10000000, files: 1 }
  // })

  app.get(
    '/api/uploads',
    passport.isAuthenticated,
    uploadController.getUploadsByUser
  )
  app.post(
    '/api/upload',
    passport.isAuthenticated,
    uploadUnprocessed.single('imageFile'),
    (req, res, next) => {
      req.upload = {
        source: req.file.location,
        s3Key: req.file.key
      }
      next()
    },
    googleVisionApi.getImageAnnotation,
    AWSRekognitionController.getRekognition,
    /* hit other api */
    uploadController.createUploads
  )
  app.post(
    '/api/uploads',
    passport.isAuthenticated,
    uploadUnprocessed.single('imageFile'),
    (req, res, next) => {
      req.upload = {
        source: req.file.location,
        s3Key: req.file.key
      }
      next()
    },
    googleVisionApi.getImageAnnotation,
    AWSRekognitionController.getRekognition,
    /* hit other api */
    uploadController.createUploads
  )
}
