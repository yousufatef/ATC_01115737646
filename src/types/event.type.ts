export interface IEvent {
    _id?: string
    title: string
    description: string
    location: string
    imageUrl: string
    startDateTime: Date
    endDateTime: Date
    price: string
    isFree: boolean
    url: string
}
