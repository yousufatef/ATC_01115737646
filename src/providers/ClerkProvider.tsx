
'use client';

import { ClerkProvider as NextClerkProvider } from '@clerk/nextjs';

export function ClerkProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextClerkProvider>
            {children}
        </NextClerkProvider>
    );
}