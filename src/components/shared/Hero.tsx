export default function Hero() {

    return (
        <section className="relative rounded-xl overflow-hidden mb-8">
            {/* Simple gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.208_0.042_265.755)] to-[oklch(0.208_0.042_265.755/85%)] dark:from-[oklch(0.248_0.062_265.755)] dark:to-[oklch(0.208_0.042_265.755/95%)]" />
            {/* Simple content */}
            <div className="relative py-20 px-6 md:px-12 flex flex-col items-center text-center text-white z-10">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Discover Events Near You</h1>

                <p className="text-lg md:text-xl max-w-2xl mx-auto">
                    Find and attend events that match your interests, connect with like-minded people, and create unforgettable
                    memories.
                </p>

                {/* Simple decorative line */}
                <div className="mt-8 h-0.5 w-16 bg-white/70 rounded-full" />
            </div>
        </section>
    )
}
