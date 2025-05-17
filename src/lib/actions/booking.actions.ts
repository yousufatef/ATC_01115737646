'use server';


import { redirect } from 'next/navigation';
import { connect } from '../database';
import Booking from '../database/models/booking.model';
import { handleError } from '../utils';

export async function bookEventAction(userId: string, eventId: string) {
    await connect();

    if (!userId || !eventId) throw new Error('Missing IDs');

    const existing = await Booking.findOne({ userId, eventId });

    if (existing) {
        throw new Error('You already booked this event');
    }

    await Booking.create({ userId, eventId });

    redirect('/success');
}

export const isEventBooked = async (userId: string, eventId: string) => {
    await connect();

    const booking = await Booking.findOne({ userId, eventId });

    return Boolean(booking);
};
export async function getUserBookingWithEvents(userId: string) {
    try {
        await connect()
        const bookings = await Booking.find({ userId })
            .populate('eventId')
            .sort({ createdAt: -1 })
            .lean()
        return JSON.parse(JSON.stringify(bookings))
    } catch (error) {
        handleError(error)
    }
}
// lib/actions/booking.actions.ts
export async function getAllBookings() {
    try {
        await connect()
        const bookings = await Booking.find()
            .populate({
                path: 'eventId',
                select: 'title startDateTime price'
            })
            .populate({
                path: 'userId',
                select: 'firstName lastName'
            })
            .sort({ createdAt: -1 })
            .lean()
        return JSON.parse(JSON.stringify(bookings))
    } catch (error) {
        handleError(error)
        throw error
    }
}