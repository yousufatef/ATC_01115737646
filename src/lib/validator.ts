import { z } from "zod";

export const eventFormSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters.",
    }),
    description: z.string().min(10,
        "Description must be at least 10 characters.",
    ).max(500, "Description must be at most 500 characters."),
    location: z.string().min(10,
        "Location must be at least 10 characters.",
    ).max(400, "Location must be at most 400 characters."),
    imageUrl: z.string(),
    startDateTime: z.date(),
    endDateTime: z.date(),
    price: z.string(),
    isFree: z.boolean(),
    url: z.string().url(),

})