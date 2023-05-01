import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="max-w-5xl flex-1 mx-auto py-4">
      <h1>Home</h1>
    </main>
  )
}
