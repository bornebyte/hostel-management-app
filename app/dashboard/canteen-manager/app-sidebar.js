import { NotebookPen, Home, Eye, MessageSquareQuote, Send, MessageCircle } from "lucide-react"

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
        url: "/dashboard/canteen-manager",
        icon: Home,
    },
    {
        title: "Add Menu",
        url: "/dashboard/canteen-manager/add-menu",
        icon: NotebookPen,
    },
    {
        title: "View Menu",
        url: "/dashboard/canteen-manager/view-menu",
        icon: Eye,
    },
    {
        title: "View Feedback",
        url: "/dashboard/canteen-manager/view-feedback",
        icon: MessageSquareQuote,
    },
    {
        title: "Broadcast Message",
        url: "/dashboard/canteen-manager/broadcast-message",
        icon: Send,
    },
    {
        title: "Message",
        url: "/dashboard/canteen-manager/messages",
        icon: MessageCircle,
    },
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