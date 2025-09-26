import { NotebookPen, Home, MessageCircle, Eye, Send } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "Home",
        url: "/dashboard/warden",
        icon: Home,
    },
    {
        title: "Attendance",
        url: "/dashboard/warden/attendance",
        icon: NotebookPen,
    },
    {
        title: "Messages",
        url: "/dashboard/warden/messages",
        icon: MessageCircle,
    },
    {
        title: "View Menu",
        url: "/dashboard/warden/view-menu",
        icon: Eye,
    },
    {
        title: "Broadcast Message",
        url: "/dashboard/warden/broadcast-message",
        icon: Send,
    }
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}