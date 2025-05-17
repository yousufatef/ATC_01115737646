import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <section className="container py-10 lg:py-16  grid  grid-cols-1 md:grid-cols-2 gap-8 lg:gap-2 rounded-2xl overflow-hidden">
            <Skeleton
                className="w-[500px] h-[500px] rounded-sm object-cover"
            />
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-center justify-between  gap-4">
                        <Skeleton className="w-[75px] h-[35px] rounded-[12px]" />

                    </div>
                    <Skeleton className="w-[250px] h-[30px]" />
                </div>
                <div className="flex flex-col gap-5 text-gray-700">
                    <div className="flex items-center gap-2 text-sm">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/5">
                            <Skeleton className="h-4 w-4 " />
                        </div>
                        <Skeleton className="w-[100px] h-[25px]" />
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/5">
                            <Skeleton className="h-4 w-4" />
                        </div>
                        <Skeleton className="w-[100px] h-[25px]" />
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <Skeleton className="w-[250px] h-[30px]" />

                    <Skeleton className="w-[270px] h-[20px]" />

                </div>
                <div>
                    <Skeleton className="w-[110px] h-[40px]" />
                    <>
                        <div>
                            <Skeleton className="w-[280px] h-[20px]" />
                        </div>
                    </>
                </div>
            </div>
        </section>
    )
}