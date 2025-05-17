"use client"

import dynamic from "next/dynamic"
import Link from "next/link"

const LottieHandler = dynamic(() => import("@/components/shared/LottieHandler"), {
    ssr: false, // disables server-side rendering
})

const NotFound = () => {
    return (
        <div className="container">
            <div
                className="flex flex-col items-center"
                style={{ marginTop: "10%" }}
            >
                <LottieHandler type="notFound" />
                <Link href="/" replace={true} className="underline">
                    How about going back to safety?
                </Link>
            </div>
        </div>
    )
}

export default NotFound
