"use client"
import { useState } from 'react'
import { Pen, Trash } from 'lucide-react'
import { deleteEvent } from '@/lib/actions/event.actions'
import Spinner from '@/components/shared/Spinner'
import { Button } from '@/components/ui/button'
import { IEvent } from '@/types/event.type'
import { useRouter } from 'next/navigation'


const EventTableActions = ({ event }: { event: IEvent }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    return (
        <>

            <Button size={"icon"} variant={"destructive"} onClick={async () => {
                setLoading(true)
                await deleteEvent({ eventId: event._id as string })
                setLoading(false)
            }}>
                {loading ? <Spinner /> : <Trash size={16} />}
            </Button>
            <Button size={"icon"} onClick={() => router.push(`dashboard/update-event/${event._id}`)}>
                <Pen size={16} />
            </Button>
        </>
    )
}

export default EventTableActions