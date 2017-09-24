const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema(
  {
    source: String,
    latitude: String,
    longitude: String,
    googleVision: [
      {
        rank: Number,
        description: String,
        score: Number
      }
    ],
    matches: [
      {
        rank: Number,
        description: String,
        score: Number
      }
    ]
  },
  { timestamps: true }
)

const Upload = mongoose.model('Upload', uploadSchema)

module.exports = Upload
