const mongoose, { Schema } = require('mongoose')

const { ObjectId } = Schema.Types

const testimonySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    client: {
        type: ObjectId,
        ref: 'Client'
    }
}, { timestamps: true })

module.exports = mongoose.model('Testimony', testimonySchema)