"use server"

import { IEvent } from "@/types/event.type"
import { connect } from "../database"
import Event from "../database/models/event.model"
import { handleError } from "../utils"

export const createEvent = async (event: IEvent) => {
  try {
    await connect();
    const newEvent = await Event.create({ ...event })

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
};
export const updateEvent = async (event: IEvent) => {
  try {
    const eventToUpdate = await Event.findById(event._id)
    if (!eventToUpdate) {
      throw new Error('Event not found')
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event },
      { new: true }
    )

    return JSON.parse(JSON.stringify(updatedEvent));
  } catch (error) {
    handleError(error);
  }
};



export const getEventById = async (eventId: string) => {
  try {
    await connect()
    const event = await Event.findById(eventId)
    return JSON.parse(JSON.stringify(event))

  }
  catch (error) {
    handleError(error)
  }
}
export async function getAllEvents({ query, limit = 6, page = 1 }: { query?: string; limit?: number; page?: number }) {
  try {
    await connect();

    const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {};
    const skipAmount = (Number(page) - 1) * limit;

    const eventsQuery = Event.find(titleCondition)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit);

    const events = await eventsQuery;
    const eventsCount = await Event.countDocuments(titleCondition);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}


export const getAllEventsDashboard = async () => {
  try {
    await connect();
    const events = await Event.find();

    return JSON.parse(JSON.stringify(events))
  } catch (error) {
    handleError(error);
  }
};

export async function deleteEvent({ eventId }: { eventId: string }) {
  try {
    await connect()

    await Event.findByIdAndDelete(eventId)
  } catch (error) {
    handleError(error)
  }
}
