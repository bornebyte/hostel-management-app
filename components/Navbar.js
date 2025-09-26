import Link from "next/link"
import { Key } from 'lucide-react';
import { ModeToggle } from "./Theme-toggler";
import { cookies } from "next/headers";
import { Button } from "./ui/button";
import { logout } from "@/app/actions";

const Navbar = async () => {
    const cookieStore = await cookies()
    const hasCookie = cookieStore.has('session')
    const role = cookieStore.get('role')
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center border-b">
            <Link href="/" className="flex items-center justify-center">
                <Key className="h-6 w-6 text-yellow-400" />
                <span className="sr-only">Hostel Management</span>
            </Link>
            <nav className="ml-auto flex items-center gap-4 sm:gap-6">
                <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
                    Home
                </Link>
                <Link href="/auth" className="text-sm font-medium hover:underline underline-offset-4">
                    Auth
                </Link>
                {hasCookie ? (
                    <div className="flex items-center gap-4">
                        <Link href={`/dashboard/${role.value}`} className="text-sm font-medium hover:underline underline-offset-4">
                            Dashboard
                        </Link>
                        <Button onClick={logout} variant="outline">Logout</Button>
                    </div>
                ) : (
                    ""
                )}
                <ModeToggle />
            </nav>
        </header>
    )
}

export default Navbar