import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
}

export default function PaginationControls({
    currentPage,
    totalPages,
}: PaginationControlsProps) {
    return (
        <div className="flex justify-center gap-2">
            {/* Previous Button */}
            <Link
                href={`?page=${currentPage - 1}`}
                className={cn(
                    buttonVariants({ variant: "outline" }),
                    currentPage <= 1 && "pointer-events-none opacity-50"
                )}
            >
                <ArrowLeft />
            </Link>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <Link
                        key={pageNum}
                        href={`?page=${pageNum}`}
                        className={cn(
                            buttonVariants({ variant: "outline" }),
                            pageNum === currentPage && "bg-primary text-primary-foreground dark:text-gray-400"
                        )}
                    >
                        {pageNum}
                    </Link>
                ))}
            </div>

            {/* Next Button */}
            <Link
                href={`?page=${currentPage + 1}`}
                className={cn(
                    buttonVariants({ variant: "outline" }),
                    currentPage >= totalPages && "pointer-events-none opacity-50"
                )}
            >
                <ArrowRight />
            </Link>
        </div>
    );
}