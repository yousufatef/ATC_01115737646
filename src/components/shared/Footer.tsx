import { Calendar } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <footer className="border-t py-6 md:py-8">
            <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
                    <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                        <Calendar className="h-5 w-5" />
                        <span>EventHub</span>
                    </Link>
                    <p className="text-center text-sm text-muted-foreground md:text-left">
                        &copy; {new Date().getFullYear()} Youssef Atef. All rights reserved.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Terms
                    </Link>
                    <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Privacy
                    </Link>
                    <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer