import BookingBtn from "@/components/shared/BookingBtn";
import { findUserFromClerkId } from "@/hooks/findUserFromClerkId";
import { isEventBooked } from "@/lib/actions/booking.actions";
import { getEventById } from "@/lib/actions/event.actions";
import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";

const EventDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const event = await getEventById(id);
    const { dbUserId } = await findUserFromClerkId()
    const isBooked = await isEventBooked(dbUserId, id);

    const formattedStartDate = format(new Date(event.startDateTime), "PP");
    const formattedEndDate = format(new Date(event.endDateTime), "PP");

    return (
        <section className="container py-10 lg:py-16  grid  grid-cols-1 md:grid-cols-2 gap-8 lg:gap-2 rounded-2xl overflow-hidden">
            <Image
                src={event.imageUrl}
                alt={event.title}
                className="w-[500px] h-[500px] rounded-sm object-cover"
                width={500}
                height={500}
            />
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center justify-between  gap-4">
                        <span className="bg-green-100 text-green-700 px-4 lg:px-6 py-[6px] rounded-[12px]">
                            {event.isFree ? "Free" : `$${event.price}`}
                        </span>

                    </div>
                    <h2 className="text-3xl font-bold text-primary">{event.title}</h2>
                </div>
                <div className="flex flex-col gap-5 text-gray-700">
                    <div className="flex items-center gap-2 text-sm">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/5">
                            <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/5">
                            <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{formattedStartDate} - {formattedEndDate}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-semibold text-primary">
                        {"What You'll See ?"}
                    </h3>

                    <p className="text-primary leading-relaxed">{event.description}</p>

                </div>
                <div>
                    <BookingBtn eventId={id} userId={dbUserId} isBooked={isBooked} />
                    {event.url && (
                        <>
                            <div>
                                More about the event
                                <a
                                    href={event.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-600 hover:text-primary-800 transition underline ml-1"
                                >
                                    Click here
                                </a>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default EventDetails;

