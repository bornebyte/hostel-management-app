import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/dashboard/warden/app-sidebar"

export default function WardenLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main className="flex justify-center h-screen w-full py-10">
        {children}
      </main>
    </SidebarProvider>
  )
}