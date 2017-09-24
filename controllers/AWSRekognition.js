var AWS = require('aws-sdk')
var rekognition = new AWS.Rekognition({ apiVersion: '2016-06-27' })
AWS.config.update({ region: 'us-west-2' })
// AWS.config.loadFromPath('./config/AWSRekognition.json')
exports.getRekognition = () => {
    /* This operation detects labels in the supplied image */
    var params = {
        Image: {
            S3Object: {
                Bucket: 'captain-planet-user-images-2',
                Name: 'IMG_1188-min.JPG'
            }
        },
        MaxLabels: 4,
        MinConfidence: 70
    }
    rekognition.detectLabels(params, function(err, data) {
        if (err)
            console.log(err, err.stack) // an error occurred
        else console.log(JSON.stringify(data, null, 4)) // successful response
    })
}
exports.getRekognition()
