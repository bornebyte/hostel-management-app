import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/dashboard/admin/app-sidebar"

export default function AdminLayout({ children }) {
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