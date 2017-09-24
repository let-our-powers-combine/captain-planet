const vision = require('@google-cloud/vision')({
  projectId: 'captain-planet',
  keyFilename: './config/googleVisionApi.json'
})

exports.getImageAnnotation = (req, res, next) => {
  req.upload = req.upload || {}
  const request = {
    image: { source: { imageUri: req.upload.source } },
    features: [
      // { type: 'LABEL_DETECTION', maxResults: 4 },
      { type: 'WEB_DETECTION', maxResults: 4 }
    ]
  }

  vision
    .annotateImage(request)
    .then(response => {
      console.log(JSON.stringify(response, null, 4))
      req.upload.matches = req.upload.matches || {}
      const data =
        response[0] &&
        response[0].webDetection &&
        response[0].webDetection.webEntities
      data.map((d, ind) => {
        d.rank = ind + 1
        return d
      })
      req.upload.matches.google = data
      next()
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: 'Error using google vision api' })
    })
}

// exports.getImageAnnotation({
//   imageUri:
//     'https://s3-us-west-2.amazonaws.com/captain-planet-user-images-2/IMG_1188-min.JPG'
// })
