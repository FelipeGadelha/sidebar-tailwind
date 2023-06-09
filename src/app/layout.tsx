import Sidebar from '../components/Sidebar'
import './globals.css'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='flex gap-5'>
        <Sidebar />
        {children}
      </body>
    </html>
  )
}
