import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/dashboard/student/app-sidebar"

export default function StudentLayout({ children }) {
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