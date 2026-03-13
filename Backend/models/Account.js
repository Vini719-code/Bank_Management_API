const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    accountHolderName: {
        type: String,
        required: true,
        trim: true
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    accountType: {
        type: String,
        required: true,
        enum: ['Savings', 'Current']
    },
    balance: {
        type: Number,
        required: true,
        min: 0
    },
    branch: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Account', accountSchema);
