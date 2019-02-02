const mongoose, { Schema } = require('mongoose')

const { ObjectId } = Schema.Types

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    img: String,
    category: {
        type: ObjectId,
        ref: 'Category'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Project', projectSchema)