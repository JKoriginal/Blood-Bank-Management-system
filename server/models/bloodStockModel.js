import mongoose from '../config/mongooseConfig.js';

const { Schema } = mongoose;

const BloodStockSchema = new Schema({
    bloodGroup: {
        type: String,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    availablePercentage: {
        type: Number,
        required: true
    },
    currentVolume: {
        type: Number,
        required: true
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    matchingBloodTypes: {
        type: [String],
        default: []
    },
    incompatibleBloodTypes: {
        type: [String],
        default: []
    }
});

const BloodStockModel = mongoose.model('BloodStock', BloodStockSchema);

export default BloodStockModel;