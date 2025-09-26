import { Bone, Eye, Home, MessageCircle, MessageSquare, Send } from "lucide-react"

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
        url: "/dashboard/student",
        icon: Home,
    },
    {
        title: "Food Feedback",
        url: "/dashboard/student/food-feedback",
        icon: Bone,
    },
    {
        title: "Messages",
        url: "/dashboard/student/messages",
        icon: MessageCircle,
    },
    {
        title: "Feedback",
        url: "/dashboard/student/feedback",
        icon: Send,
    },
    {
        title: "View Menu",
        url: "/dashboard/student/view-menu",
        icon: Eye,
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