import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning  >

            <body
            >
                <Header />
                    {children}
                <Footer />
            </body>
        </html>
    );
}
