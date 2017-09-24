const mongoose = require('mongoose')
const Schema = mongoose.Schema

const uploadSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    source: String,
    latitude: String,
    longitude: String,
    matches: {
      google: [
        {
          rank: Number,
          description: String,
          score: Number
        }
      ],
      aws: [
        {
          rank: Number,
          description: String,
          score: Number
        }
      ],
      azure: [
        {
          rank: Number,
          description: String,
          score: Number
        }
      ]
    },
    results: [
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
