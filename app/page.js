import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/images/ZelmifonLogo.png"
          alt="Zelmifon logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">Get started by selling or buying a used phone.</li>
          <li>Save money and live happily.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link href="/Sign-In">
            <button 
            className="rounded-full border border-black transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-lg sm:text-base h-12 w-40 px-5 font-bold"
  >           Sign In
            </button>
          </Link>

          <Link href="/Sign-Up">
            <button 
            className="rounded-full border border-black transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-lg sm:text-base h-12 w-40 px-5 font-bold"
  >           Sign Up
            </button>
          </Link>
          </div>
      </main>
    </div>
  );
}
