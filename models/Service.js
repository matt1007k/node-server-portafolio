const mongoose, { Schema } = require('mongoose')

const serviceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    icon: String,
},{ timestamps: true })

module.exports = mongoose.model('Service', serviceSchema)