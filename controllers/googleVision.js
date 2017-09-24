const vision = require('@google-cloud/vision')({
  projectId: 'captain-planet',
  keyFilename: './config/googleVisionApi.json'
})

exports.getImageAnnotation = (req, res, next) => {
  const request = {
    image: { source: { imageUri: req.imageUri } },
    features: [
      { type: 'LABEL_DETECTION', maxResults: 4 },
      { type: 'WEB_DETECTION', maxResults: 4 }
    ]
  }

  vision
    .annotateImage(request)
    .then(response => {
      console.log(JSON.stringify(response, null, 4))
    })
    .catch(err => {
      console.error(err)
    })
}

exports.getImageAnnotation({
  imageUri:
    'https://s3-us-west-1.amazonaws.com/captain-planet-user-images/IMG_1188-min.JPG'
})
