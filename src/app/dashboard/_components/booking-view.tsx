"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { getAllBookings } from "@/lib/actions/booking.actions" // You'll need to create this
import { format } from "date-fns"

interface Booking {
    _id: string;
    userId: string;
    eventId: {
        _id: string;
        title: string;
        startDateTime: Date;
        price?: number;
    };
    user: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    createdAt: Date;
    status: "confirmed" | "cancelled" | "completed";
}

export function BookingsView() {
    const router = useRouter()
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true)
                const allBookings = await getAllBookings()
                setBookings(allBookings)
            } catch (err) {
                setError("Failed to fetch bookings")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchBookings()
    }, [])

    if (loading) {
        return (
            <div className="py-6">
                <div className="flex gap-1 items-center cursor-pointer mb-4" onClick={() => router.push("/")}>
                    <ChevronLeft className="h-6 w-6" />
                    <span className="font-semibold">Home</span>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Bookings</CardTitle>
                        <CardDescription>Loading bookings...</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="animate-pulse space-y-4">
                            <div className="h-10 bg-gray-200 rounded"></div>
                            <div className="h-10 bg-gray-200 rounded"></div>
                            <div className="h-10 bg-gray-200 rounded"></div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (error) {
        return (
            <div className="py-6">
                <div className="flex gap-1 items-center cursor-pointer mb-4" onClick={() => router.push("/")}>
                    <ChevronLeft className="h-6 w-6" />
                    <span className="font-semibold">Home</span>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-red-500">{error}</div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="py-6">
            <div className="flex gap-1 items-center cursor-pointer mb-4" onClick={() => router.push("/")}>
                <ChevronLeft className="h-6 w-6" />
                <span className="font-semibold">Home</span>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Bookings</CardTitle>
                    <CardDescription>View and manage customer bookings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Booking ID</TableHead>
                                <TableHead>Event</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking._id}>
                                    <TableCell className="font-medium">BK-{booking._id.slice(-6).toUpperCase()}</TableCell>
                                    <TableCell>{booking.eventId.title}</TableCell>
                                    <TableCell>{booking.user?.firstName} {booking.user?.lastName}</TableCell>
                                    <TableCell>{booking.eventId.title}</TableCell>
                                    <TableCell>{format(new Date(booking.eventId.startDateTime), "PP")}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}