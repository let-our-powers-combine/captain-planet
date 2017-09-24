const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-west-2' })

const rekognition = new AWS.Rekognition({ apiVersion: '2016-06-27' })
// AWS.config.loadFromPath('./config/AWSRekognition.json')
exports.getRekognition = (req, res, next) => {
  req.upload = req.upload || {}
  req.upload.matches = req.upload.matches || {}
  console.log(req.upload, req.file)
  /* This operation detects labels in the supplied image */
  const params = {
    Image: {
      S3Object: {
        Bucket: 'captain-planet-user-images-2',
        Name: req.upload.s3Key
      }
    },
    MaxLabels: 4,
    MinConfidence: 70
  }
  rekognition.detectLabels(params, function(err, data) {
    if (err) {
      console.log(err, err.stack) // an error occurred
      res.status(500).json({ error: 'Error using AWS rekognition api' })
    } else {
      console.log(JSON.stringify(data, null, 4)) // successful response
      const relevantData = data.Labels
        .sort((a, b) => (a.Confidence > b.Confidence ? -1 : 1))
        .map((l, ind) => ({
          rank: ind + 1,
          score: l.Confidence,
          description: l.Name
        }))
      req.upload.matches.aws = relevantData
      next()
    }
  })
}
// exports.getRekognition()
