import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex items-center p-4 gap-4 shadow-md border-b-2">
      <div className="mr-auto">Create a Exam</div>
      <SignedIn>
        <Link href="/exams">New Exam</Link>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  );
}
