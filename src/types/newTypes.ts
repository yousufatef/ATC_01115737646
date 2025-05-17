export interface Event {
    id: string
    title: string
    description: string
    date: string
    time: string
    location: string
    organizer: string
    category: string
    image: string
    isFeatured: boolean
    tickets: TicketType[]
}

export interface TicketType {
    type: string
    price: number
    available: number
}

export interface Order {
    id: string
    event: Event
    tickets: {
        type: string
        price: number
        quantity: number
    }[]
    total: number
    purchaseDate: string
    status: "confirmed" | "canceled" | "pending"
}
