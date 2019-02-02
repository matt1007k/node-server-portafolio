const mongoose, { Schema } = require('mongoose')

const clientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    position: String,
    img: String,
}, { timestamps: true })


module.exports = mongoose.model('Client', clientSchema)