"use client";

import { IEvent } from "@/types/event.type";
import { Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export function EventCard({ event }: { event: IEvent }) {
    const formattedStartDate = format(new Date(event.startDateTime), "PP");
    const formattedEndDate = format(new Date(event.endDateTime), "PP");
    const formattedPrice = event.isFree ? <span className="bg-green-100 text-green-700 px-4 lg:px-6 py-[6px] rounded-[12px]">Free</span> :
        <span className="bg-secondary text-green-700 px-4 lg:px-6 py-[6px] rounded-[12px]">${event.price}</span>
        ;

    return (
        <motion.div
            className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:border-gray-800 dark:bg-gray-950"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="absolute -right-12 -top-12 h-24 w-24 rotate-12 bg-gradient-to-br from-primary/20 to-primary/5 blur-2xl" />
            <div className="absolute -left-12 -bottom-12 h-24 w-24 rotate-12 bg-gradient-to-tr from-primary/20 to-primary/5 blur-2xl" />

            {/* Image with overlay on hover */}
            <div className="relative overflow-hidden">
                <Image
                    src={event.imageUrl}
                    alt={event.title}
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    width={400}
                    height={256}
                    priority
                    unoptimized={event.imageUrl ? false : true}
                />


            </div>

            {/* Card content */}
            <div className="p-5">
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-[18px] lg:text-xl font-bold tracking-tight  text-gray-900 dark:text-white overflow-hidden text-nowrap">{event.title}</h3>
                        <span className="font-semibold text-[14px] lg:text-[16px]">{formattedPrice}</span>
                    </div>
                    <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400 overflow-hidden text-nowrap">
                        {event.description || "Join us for an exciting event!"}
                    </p>
                </div>

                {/* Event details */}
                <div className="mb-5 space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/5">
                            <MapPin className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{event.location}</span>
                    </div>
                    <>
                        <div className="flex items-center gap-2 text-sm">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/5">
                                <Calendar className="h-4 w-4 text-primary" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300">{formattedStartDate} - {formattedEndDate}</span>
                        </div>
                    </>

                </div>

                {/* Action button */}
                <Button
                    asChild
                    size="lg"
                    className="relative w-full overflow-hidden"
                >
                    <Link href={`/events/${event._id}`}>
                        Show details
                        <motion.div
                            className="absolute inset-0 -z-0 bg-white"
                            initial={{ x: "-100%", opacity: 0.3 }}
                            whileHover={{ x: "100%", opacity: 0.2 }}
                            transition={{ duration: 0.5 }}
                        />

                    </Link>
                </Button>
            </div>
        </motion.div >
    );
}
