"use client"

import { useState } from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarProvider,
    SidebarTrigger,
    SidebarInset,
    SidebarRail,
} from "@/components/ui/sidebar"
import { DashboardNav } from "./_components/dashboard-nav"
import { UsersView } from "./_components/users-view"
import { BookingsView } from "./_components/booking-view"
import EventsView from "./_components/events-view"
import { ModeToggle } from "@/components/ModeToggle"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import dynamic from "next/dynamic"
const LottieHandler = dynamic(() => import("@/components/shared/LottieHandler"), {
    ssr: false, // disables server-side rendering
})

export default function Dashboard() {
    const [activeView, setActiveView] = useState<"users" | "events" | "bookings">("users")
    const { isSignedIn, user, isLoaded } = useUser();
    if (!isLoaded) {
        return null
    }
    if (isSignedIn && user.publicMetadata.isAdmin) {
        return (
            <SidebarProvider>
                <div className="flex min-h-screen w-full">
                    <Sidebar>
                        <SidebarHeader className="border-b border-sidebar-border">
                            <div className="flex h-16 items-center px-3 justify-between">
                                <h2 className="text-lg font-semibold">Dashboard</h2>
                                <ModeToggle />
                            </div>
                        </SidebarHeader>
                        <SidebarContent>
                            <DashboardNav onNavigate={setActiveView} activeItem={activeView} />

                        </SidebarContent>

                        <SidebarRail />
                    </Sidebar>
                    <SidebarInset>
                        <div className="flex flex-col w-full">
                            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
                                <SidebarTrigger />

                            </header>
                            <main className="flex-1 px-6">
                                {activeView === "users" && <UsersView />}
                                {activeView === "events" && <EventsView />}
                                {activeView === "bookings" && <BookingsView />}
                            </main>
                        </div>
                    </SidebarInset>

                </div>
            </SidebarProvider>
        )
    } else {
        return (
            <div className="container">
                <div
                    className="flex flex-col items-center"
                    style={{ marginTop: "15%" }}
                >
                    <LottieHandler type="notFound" />
                    <Link href="/" replace={true} className="underline">
                        How about going back to safety?
                    </Link>
                </div>
            </div>
        )
    }


}
