import Link from "next/link";

export default function HomePage() {
  return (
    <main >
      <h1>Hello, Next.js!</h1>
        <Link href={'/dashboard'}>Dashboard </Link>
    </main>
  )
}
