import type { Metadata } from 'next'
import Nav from '@/src/components/Nav'
import './globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // 根据你需要的权重选择
  display: 'swap',
})


export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Next.js',
}


export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Nav />
        <main className='max-w-4xl m-auto'>{children}</main>
      </body>
    </html>
  )
}