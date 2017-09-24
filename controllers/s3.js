module.exports = s3 => {
  const uploadUserImage = (req, res) => {
    // Get userId and guid
    const userId = req.userId
    const imageId = req.imageId
    // call S3 to retrieve upload file to specified bucket
    const uploadParams = {
      Bucket: 'captain-planet-user-images',
      Key: '',
      Body: ''
    }

    uploadParams.Key = `${userId}/${imageId}`

    // call S3 to retrieve upload file to specified bucket
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.log('Error', err)
        res.send('Error storing image')
      }
      if (data) {
        console.log('Upload Success', data.Location)
        res.send('Successfully uploaded image!')
      }
    })
  }

  const getUserImages = (req, res) => {
    const userId = req.userId
    const params = {
      Bucket: 'captain-planet-user-images',
      prefix: userId
    }
    s3.listObjects(params, (err, data) => {
      if (err) {
        console.log(err, err.stack) // an error occurred
      } else {
        console.log(data) // successful response
      }
    })
  }

  const getAllUserImages = (req, res) => {
    const params = {
      Bucket: 'captain-planet-user-images'
    }
    s3.listObjects(params, (err, data) => {
      if (err) {
        console.log(err, err.stack) // an error occurred
      } else {
        console.log(data) // successful response
      }
    })
  }

  return {
    uploadUserImage,
    getUserImages,
    getAllUserImages
  }
}
