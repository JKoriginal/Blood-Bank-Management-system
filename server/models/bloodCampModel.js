import mongoose from '../config/mongooseConfig.js';

const { Schema } = mongoose;

const bloodCampSchema = new Schema({
  CampName: { 
    type: String, 
    required: true 
  },
  Venue: {
    Name: { 
      type: String, 
      required: true 
    },
    Latitude: { 
      type: Number, 
      required: true 
    },
    Longitude: { 
      type: Number, 
      required: true 
    }
  },
  Date: { 
    type: Date, 
    required: true 
  },
  StartTime: { 
    type: String, 
    required: true 
  },
  EndTime: { 
    type: String, 
    required: true 
  },
  Organizer: { 
    type: String, 
    required: true 
  },
  ContactPerson: { 
    type: String, 
    required: true 
  },
  ContactNumber: { 
    type: String, 
    required: true 
  },
  DonorRegistrationForm: { 
    type: String 
  },
  CampStatus: { 
    type: String, 
  },
  ApprovedStatus: { 
    type: Boolean, 
    required: true 
  }
});

// Create a model using the schema
const BloodCamp = mongoose.model('BloodCamp', bloodCampSchema);

export default BloodCamp;