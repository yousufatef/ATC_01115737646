// components/EventList.tsx
import { IEvent } from "@/types/event.type";
import { getAllEvents } from "@/lib/actions/event.actions";
import { EventCard } from "./shared/EventCard";
import PaginationControls from "./shared/PaginationControls";
import Searchbar from "./shared/Search";
import LottieHandler from "./shared/LottieHandler";

interface EventListProps {
    searchParams: {
        page?: string;
        query?: string
    };
}

const EventList = async ({ searchParams }: EventListProps) => {
    const page = Number(searchParams.page) || 1;
    const limit = 6;
    const searchText = (searchParams?.query as string) || "";

    const eventsData = await getAllEvents({ page, limit, query: searchText });

    const { data: events = [], totalPages = 1 } = eventsData || {};

    return (
        <div className="py-8">
            <div className="mb-8">
                <Searchbar />
            </div>

            {events.length === 0 ? (
                <div className="text-center">
                    <LottieHandler type="empty" />
                    <strong>No results for your search!</strong>
                </div>
            ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
                    {events.map((event: IEvent) => (
                        <EventCard key={event._id} event={event} />
                    ))}
                </div>
            )}

            {totalPages > 1 && events.length > 0 && (
                <PaginationControls currentPage={page} totalPages={totalPages} />
            )}
        </div>
    );
};


export default EventList;