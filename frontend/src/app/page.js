import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-screen py-2 bg-black text-blue-500 text-2xl">
      <Link href="/login">Go to login Page</Link>
      <Link href="/signup">Go to signup Page</Link>
    </div>
  );
}
