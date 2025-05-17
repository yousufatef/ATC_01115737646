"use client";

import { useState } from 'react';
import { bookEventAction } from '@/lib/actions/booking.actions';
import { Button } from '../ui/button';
import Spinner from './Spinner';

const BookingBtn = ({
    userId,
    eventId,
    isBooked: initialBooked,
}: {
    userId: string;
    eventId: string;
    isBooked: boolean;
}) => {
    const [isBooked, setIsBooked] = useState(initialBooked);
    const [loading, setLoading] = useState(false);

    const handleBooking = async () => {
        if (isBooked || loading) return;

        setLoading(true);

        try {
            await bookEventAction(userId, eventId);
            setIsBooked(true);
        } catch (error) {
            console.error("Booking failed:", error);
            // You can show a toast or error UI here
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            className="mb-2"
            disabled={isBooked || loading}
            size="lg"
            onClick={handleBooking}
        >
            {loading ? <> <Spinner /> Booking...</> : isBooked ? "Booked" : "Book Now"}
        </Button>
    );
};

export default BookingBtn;
