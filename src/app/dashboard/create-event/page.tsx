"use client";
import EventForm from '@/components/shared/EventForm';
import { useUser } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react'

const LottieHandler = dynamic(() => import("@/components/shared/LottieHandler"), {
    ssr: false, // disables server-side rendering
})

const CreateEventPage = () => {
    const { isSignedIn, user, isLoaded } = useUser();
    if (!isLoaded) {
        return null
    }
    if (isSignedIn && user.publicMetadata.isAdmin) {
        return (
            <>

                <div className="my-8">
                    <EventForm type='create' />
                </div>
            </>
        )
    } else {
        return (
            <div className="container">
                <div
                    className="flex flex-col items-center"
                    style={{ marginTop: "15%" }}
                >
                    <LottieHandler type="notFound" />
                    <Link href="/" replace={true} className="underline">
                        How about going back to safety?
                    </Link>
                </div>
            </div>
        )
    }
}

export default CreateEventPage
