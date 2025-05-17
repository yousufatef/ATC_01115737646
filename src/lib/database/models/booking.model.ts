import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
    userId: string
    eventId: mongoose.Types.ObjectId;
    createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
    userId: { type: String, required: true },
    eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
    createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
export default Booking;

