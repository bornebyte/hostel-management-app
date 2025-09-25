import Image from "next/image";
import Link from "next/link";
import { Luggage, BedDouble, Users, BarChart, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      <main className="flex-1">
        <section className="w-full py-6 md:py-12 lg:py-16 xl:py-24 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
          <div className="container px-4 md:px-6 text-center md:text-left">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    The All-in-One Hostel Management Solution
                  </h1>
                  <p className="max-w-[600px] text-gray-300 md:text-xl">
                    Streamline your hostel operations, from bookings to guest management, all in one simple platform. 
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-yellow-400 px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-yellow-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-yellow-600"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-transparent px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <Image
                src="/icon1.svg"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Run Your Hostel</h2>
                <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform is packed with features to make your life easier and your guests happier.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <Luggage className="h-8 w-8 text-yellow-500" />
                  <h3 className="text-xl font-bold">Effortless Bookings</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400">Manage all your online and walk-in bookings in one place with a simple, intuitive calendar.</p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <BedDouble className="h-8 w-8 text-yellow-500" />
                  <h3 className="text-xl font-bold">Room & Bed Management</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400">Keep track of occupancy, assign beds, and manage room types with ease.</p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <Users className="h-8 w-8 text-yellow-500" />
                  <h3 className="text-xl font-bold">Guest Management</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400">Maintain guest profiles, track their history, and provide a personalized experience.</p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <BarChart className="h-8 w-8 text-yellow-500" />
                  <h3 className="text-xl font-bold">Insightful Reporting</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400">Get valuable insights into your business with our comprehensive reporting tools.</p>
              </div>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-8 w-8 text-yellow-500" />
                  <h3 className="text-xl font-bold">Secure Payments</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400">Integrate with popular payment gateways to accept payments securely.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Users Say</h2>
              <p className="mx-auto max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from hostel owners who have transformed their business with our platform.
              </p>
            </div>
            <div className="grid w-full grid-cols-1 lg:grid-cols-3 items-center justify-center gap-8 lg:gap-12 [&>img]:mx-auto">
              <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                <div className="space-y-2 text-center">
                  <p className="text-lg font-semibold">&quot;This software has been a game-changer for our hostel. Highly recommended!&quot;</p>
                  <footer className="text-sm text-gray-500 dark:text-gray-400">Jane Doe, The Wanderer&apos;s Inn</footer>
                </div>
              </div>
              <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                <div className="space-y-2 text-center">
                  <p className="text-lg font-semibold">&quot;Simple, powerful, and amazing support. It has saved us countless hours.&quot;</p>
                  <footer className="text-sm text-gray-500 dark:text-gray-400">John Smith, The Backpacker&apos;s Hub</footer>
                </div>
              </div>
              <div className="mx-auto flex w-full items-center justify-center p-4 sm:p-8">
                <div className="space-y-2 text-center">
                  <p className="text-lg font-semibold">&quot;Our occupancy rates have gone up since we started using this platform.&quot;</p>
                  <footer className="text-sm text-gray-500 dark:text-gray-400">Emily White, The Coastal Hostel</footer>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}