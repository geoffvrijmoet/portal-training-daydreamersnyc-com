import { ClerkProvider } from '@clerk/nextjs'
import { UserButton } from "@clerk/nextjs"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import localFont from 'next/font/local'
import './globals.css'

const fredoka = localFont({
  src: [
    {
      path: './fonts/Fredoka-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Fredoka-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Fredoka-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Fredoka-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-fredoka',
})

const quicksand = localFont({
  src: [
    {
      path: './fonts/Quicksand-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Quicksand-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Quicksand-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-quicksand',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${fredoka.variable} ${quicksand.variable}`}>
        <body className={quicksand.className}>
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
