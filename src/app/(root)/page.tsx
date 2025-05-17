import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import EventList from "@/components/event-list"
import Hero from "@/components/shared/Hero"

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    pageNum?: string;
    query?: string;
  }>;
}) {
  const searchParamsRe = await searchParams
  return (
    <main className="container mx-auto px-4 py-8">
      <Hero />

      {/* Event List */}
      <section>
        <div>
          <Suspense fallback={<EventListSkeleton />}>
            <EventList searchParams={searchParamsRe} />
          </Suspense>
        </div>
      </section>
    </main>
  )
}

function EventListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="border rounded-lg overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        ))}
    </div>
  )
}