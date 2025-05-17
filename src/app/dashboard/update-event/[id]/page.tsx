"use client";
import EventForm from '@/components/shared/EventForm';
import { getEventById } from '@/lib/actions/event.actions';
import { IEvent } from '@/types/event.type';
import { useUser } from '@clerk/nextjs';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const UpdateEventPage = () => {
    const params = useParams()
    const { id } = params
    const [event, setEvent] = useState<IEvent>()
    useEffect(() => {
        const getEvent = async () => {
            if (typeof id === 'string') {
                const event = await getEventById(id);
                setEvent(event)
            }
        }
        getEvent()
    })
    const { isSignedIn, user, isLoaded } = useUser();
    if (!isLoaded) {
        return null
    }
    if (isSignedIn && user.publicMetadata.isAdmin) {
        return (
            <>

                <div className="my-8">
                    {event && event._id && <EventForm type='edit' event={event} eventId={event._id} />}
                </div>
            </>
        )
    } else {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold">Access Denied</h1>
                <p className="mt-4 text-lg">You do not have permission to access this page....</p>
            </div>
        )
    }
}

export default UpdateEventPage