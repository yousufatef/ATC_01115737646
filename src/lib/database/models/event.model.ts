import mongoose from "mongoose";



const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    startDateTime: {
        type: Date,
        required: true,
    },
    endDateTime: {
        type: Date,
        required: true,
    },
    price: {
        type: String,
    },
    isFree: {
        type: Boolean,
        default: false,
    },
    url: {
        type: String,
    },
}, { timestamps: true });


const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
export default Event;

