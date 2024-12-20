import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { UserButton } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-14 items-center">
                <MainNav />
                <MobileNav className="md:hidden" />
                <div className="flex flex-1 items-center justify-end space-x-4">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </header>
            <main className="flex-1 container py-6">{children}</main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
