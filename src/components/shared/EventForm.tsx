"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { eventFormSchema } from "@/lib/validator";
import { eventDefaultValues } from "@/constants";
import { Textarea } from "../ui/textarea";
import { FileUploader } from "./FileUploader";
import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox";
import { useRouter } from "next/navigation";
import { createEvent, updateEvent } from "@/lib/actions/event.actions";
import { IEvent } from "@/types/event.type";
import Spinner from "./Spinner";

interface EventFormProp {
    type: "create" | "edit";
    event?: IEvent;
    eventId?: string
}

const EventForm = ({ type, event, eventId }: EventFormProp) => {
    const router = useRouter()
    const [files, setFiles] = useState<File[]>([]);
    const initialValues = event && type === "edit" ? {
        ...event,
        startDateTime: new Date(event.startDateTime),
        endDateTime: new Date(event.endDateTime)
    } : eventDefaultValues;

    const form = useForm<z.infer<typeof eventFormSchema>>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: initialValues,
    });

    const { startUpload } = useUploadThing('imageUploader');


    async function onSubmit(values: z.infer<typeof eventFormSchema>) {
        let uploadedImageUrl = values.imageUrl;

        if (files.length > 0) {
            const uploadedImages = await startUpload(files)

            if (!uploadedImages) {
                return
            }

            uploadedImageUrl = uploadedImages[0].url
        }

        if (type === 'edit') {
            if (!eventId) {
                router.back()
                return;
            }

            try {
                const updatedEvent = await updateEvent({
                    ...values,
                    imageUrl: uploadedImageUrl,
                    _id: eventId,
                })

                if (updatedEvent) {
                    form.reset();
                    router.push(`/events/${updatedEvent._id}`)
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (type === 'create') {
            try {
                const newEvent = await createEvent({
                    ...values,
                    imageUrl: uploadedImageUrl,
                })

                if (newEvent) {
                    form.reset();
                    router.push(`/events/${newEvent._id}`)
                }
            } catch (error) {
                console.log(error);
            }
        }

    }

    return (
        <div className="container">
            <h2 className="text-2xl font-bold mb-6">{type === "create" ? "Create Event" : "Edit Event"}</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <div className="flex flex-col md:flex-row gap-5">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input placeholder="Event Title" {...field} className="p-4" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                    </div>

                    <div className="flex flex-col md:flex-row gap-5">
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Textarea
                                            placeholder="Event Description"
                                            {...field}
                                            className="h-72 resize-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem className="w-full h-72">
                                    <FormControl>
                                        <FileUploader
                                            onFieldChange={field.onChange}
                                            imageUrl={field.value}
                                            setFiles={setFiles}
                                        />

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Event Location"
                                        {...field}
                                        className="p-4"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex flex-col md:flex-row gap-5">
                        <div className="w-full md:w-1/2">
                            <FormField
                                control={form.control}
                                name="startDateTime"
                                render={({ field }) => (
                                    <FormItem className="bg-input/30 border rounded-lg py-2">
                                        <FormControl >
                                            <DatePicker
                                                selected={field.value}
                                                onChange={(date) => field.onChange(date)}
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={30}
                                                dateFormat="MM/dd/yyyy h:mm aa"

                                                placeholderText="Select start date and time"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                            <FormField
                                control={form.control}
                                name="endDateTime"
                                render={({ field }) => (
                                    <FormItem className="bg-input/30 border rounded-lg py-2">
                                        <FormControl >
                                            <DatePicker
                                                selected={field.value}
                                                onChange={(date) => field.onChange(date)}
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={30}
                                                dateFormat="MM/dd/yyyy h:mm aa"

                                                placeholderText="Select end date and time"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 md:flex-row">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <div className="flex justify-center items-center w-full overflow-hidden rounded-lg border ">
                                            <Input type="number" placeholder="Price" {...field} className="border-0 bg-input/30 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
                                            <FormField
                                                control={form.control}
                                                name="isFree"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <div className="flex items-center justify-center bg-input/30 py-2">
                                                                <label htmlFor="isFree" className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ">Free Ticket</label>
                                                                <Checkbox
                                                                    onCheckedChange={field.onChange}
                                                                    checked={field.value}
                                                                    id="isFree" className="mr-2 h-5 w-5 border-2 border-primary-500" />
                                                            </div>

                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input placeholder="URL" {...field} className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit"
                        className="w-full py-6 text-lg"
                        disabled={form.formState.isSubmitting}
                    >
                        {form.formState.isSubmitting ? <> <Spinner /> Submitting</> : `${type} event`}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default EventForm;