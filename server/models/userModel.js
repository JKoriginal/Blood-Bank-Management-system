import mongoose from '../config/mongooseConfig.js';

const { Schema } = mongoose;

const userSchema = new Schema({
    userType:{
        type:String,
        required:true
    },
    nic: {
        type: String,
        required: function() {
            return this.userType === 'donor'; 
        }
    },
    fullName: {
        type: String,
        required: function() {
            return this.userType === 'donor'; 
        }
    },
    haveDonated: {
        type: Boolean,
        required: function() {
            return this.userType === 'donor'; 
        }
    },
    bloodType: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        required: function() {
            return this.userType === 'donor'; 
        }
    },
    password: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    // Organization specific fields
    organizationName: {
        type: String,
        required: function() {
            return this.userType === 'organization'; 
        }
    },
    registrationNumber: {
        type: String,
        required: function() {
            return this.userType === 'organization'; 
        }
    },
    typeOfOrganization: {
        type: String,
        required: function() {
            return this.userType === 'organization'; 
        }
    },
    contactPersonName: {
        type: String,
        required: function() {
            return this.userType === 'organization'; 
        }
    },
    address: {
        type: String,
        required: function() {
            return this.userType === 'organization'; 
        }
    },
    purposeOrMission: {
        type: String,
        required: function() {
            return this.userType === 'organization'; 
        }
    }
}, { timestamps: true });

const userModel = mongoose.model('User', userSchema);

export default userModel;
