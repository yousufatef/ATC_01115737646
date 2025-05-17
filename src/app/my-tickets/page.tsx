import Header from "@/components/shared/Header";
import LottieHandler from "@/components/shared/LottieHandler";
import { findUserFromClerkId } from "@/hooks/findUserFromClerkId";
import { getUserBookingWithEvents } from "@/lib/actions/booking.actions";
import Link from "next/link";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BookingWithEvent {
  _id: string;
  userId: string;
  eventId: {
    _id: string;
    title: string;
    startDateTime: Date;
    endDateTime: Date;
    location?: string;
    imageUrl?: string;
  };
  createdAt: Date;
}

const MyTicketsPage = async () => {
  const { dbUserId } = await findUserFromClerkId();
  const bookings: BookingWithEvent[] = await getUserBookingWithEvents(dbUserId);

  if (!bookings || bookings.length === 0) {
    return (
      <div className="mt-[10%] flex flex-col items-center justify-center h-64 gap-4">
        <LottieHandler type="empty" />
        <div className="flex gap-2">
          <span>No Tickets here</span>
          <Link href="/" className="text-blue-600 underline">
            Browse Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto py-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>My Bookings</CardTitle>
            <CardDescription>View and manage your event tickets.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Booked On</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {booking.eventId.imageUrl && (
                          <img
                            src={booking.eventId.imageUrl}
                            alt={booking.eventId.title}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <span className="font-medium">{booking.eventId.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(booking.eventId.startDateTime), "PPP")}
                    </TableCell>
                    <TableCell>
                      {format(new Date(booking.eventId.startDateTime), "p")}
                    </TableCell>
                    <TableCell>
                      {booking.eventId.location || "N/A"}
                    </TableCell>
                    <TableCell>
                      {format(new Date(booking.createdAt), "PPP")}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/events/${booking.eventId._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default MyTicketsPage;
