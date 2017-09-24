const Uploads = require('../models/Uploads')

/**
 * GET /api/uploads
 * File Uploads API example.
 */

exports.getUploadsByUser = (req, res) => {
  // Get user's shit from S3
  console.log(JSON.stringify(req.user, null, 4))
  res.json(req.user.uploads)
}

exports.createUploads = (req, res) => {
  const newUpload = {
    source: req.file.location,
    latitude: req.params.latitude || 0,
    longitude: req.params.longitude || 0,
    matches: req.upload && (req.upload.matches || []),
    results: req.upload && (req.upload.results || [])
  }
  // {
  //   fieldname: 'myFile',
  //   originalname: 'Screen Shot 2017-09-08 at 4.12.10 PM.png',
  //   encoding: '7bit',
  //   mimetype: 'image/png',
  //   size: 277958,
  //   bucket: 'captain-planet-user-images-2',
  //   key:
  //     '59c6a9e82235bad9f31e0dfa/1506248522088-Screen Shot 2017-09-08 at 4.12.10 PM.png',
  //   acl: 'private',
  //   contentType: 'image/png',
  //   contentDisposition: null,
  //   storageClass: 'STANDARD',
  //   serverSideEncryption: null,
  //   metadata: { fieldName: 'myFile' },
  //   location:
  //     'https://captain-planet-user-images-2.s3-us-west-2.amazonaws.com/59c6a9e82235bad9f31e0dfa/1506248522088-Screen%20Shot%202017-09-08%20at%204.12.10%20PM.png',
  //   etag: '"38c2ddd8ac03db179ae60ec3672df256"'
  // }
  Uploads.create(newUpload, (err, upload) => {
    if (err) {
      const error = new Error('Error creating upload record in Mongo')
      console.log(error, err)
      res.status(500).json({ error: 'Something failed!' })
    }
    res.json({ uploaded: upload })
  })
}
