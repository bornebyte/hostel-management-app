import Link from "next/link"
import { Key } from 'lucide-react';
import { ModeToggle } from "./Theme-toggler";

const Navbar = () => {
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-b">
            <Link href="/" className="flex items-center justify-center">
                <Key className="h-6 w-6 text-yellow-400" />
                <span className="sr-only">Hostel Management</span>
            </Link>
            <nav className="ml-auto flex items-center gap-4 sm:gap-6">
                <Link href="/admin" className="text-sm font-medium hover:underline underline-offset-4">
                    Admin
                </Link>
                <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
                    Testimonials
                </Link>
                <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
                    Pricing
                </Link>
                <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
                    Contact
                </Link>
                <ModeToggle />
            </nav>
        </header>
    )
}

export default Navbar