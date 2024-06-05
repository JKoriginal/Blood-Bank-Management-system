import mongoose from '../config/mongooseConfig.js';

const { Schema } = mongoose;

const bloodRequestSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  requestingBloodType: {
    type: String,
    required: true
  },
  nationalIDNumber: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  nearestBloodBank: {
    type: String,
    required: true
  },
  message: String,
  haveDonatedEarlier: Boolean,
  approvedStatus: {
    type: Boolean,
    default: false 
  }
});

const BloodRequest = mongoose.model('BloodRequest', bloodRequestSchema);

export default BloodRequest;
