import Link from "next/link";

export default function Header() {
  return (
    <div className="flex items-center w-full">
      <Link href="/" className="button-primary"> Back To Home</Link>
    </div>

  )
}
