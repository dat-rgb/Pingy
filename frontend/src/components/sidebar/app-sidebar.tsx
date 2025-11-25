
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { Moon, Sun } from "lucide-react"
import { Switch } from "../ui/switch"
import CreateNewChat from "../chat/CreateNewChat"
import NewGroupChatModal from "../chat/NewGroupChatModal"
import CroupChatList from "../chat/GroupChatList"
import AddFriendModal from "../chat/AddFriendModal"
import DireactMessageList from "../chat/DirectMessageList"
import { useThemeStore } from "@/stores/useThemeStore"
import { useAuthStore } from "@/stores/useAuthStore"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
  const {isDark, toggleTheme} = useThemeStore();
  const {user} = useAuthStore();

  
  
  return (
    <Sidebar variant="inset" {...props}>
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              size="lg" 
              asChild
              className="bg-gradient-primary"
            >
              <a href="#" className="">
                <div className="flex w-full items-center px-2 justify-between">
                  <h1 className="text-xl font-bold text-white">Pingy</h1>
                  <div className="flex items-center gap-2">
                    <Sun className="size-4 text-white" />
                    <Switch 
                      checked={isDark}
                      onCheckedChange={toggleTheme}
                      className="data-[sate=checked]:bg-background/80"
                    /> 
                    <Moon className="size-4 text-white/80" />
                  </div>
                </div>
              </a>
              {/*  */}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        {/* New chat */}
        <SidebarGroup>
          <SidebarGroupContent>
            <CreateNewChat />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Group chat */}
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">
            nhóm chat
          </SidebarGroupLabel>

          <SidebarGroupAction title="Tạo nhóm" className="cursor-pointer">
            <NewGroupChatModal />
          </SidebarGroupAction>

          <SidebarGroupContent>
            <CroupChatList /> 
          </SidebarGroupContent>

        </SidebarGroup>

        {/* Direct Message */}
          <SidebarGroup>
          <SidebarGroupLabel className="uppercase">
            bạn bè
          </SidebarGroupLabel>

          <SidebarGroupAction title="Kết bạn" className="cursor-pointer">
            <AddFriendModal /> 
          </SidebarGroupAction>

          <SidebarGroupContent>
            <DireactMessageList /> 
          </SidebarGroupContent>

        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        {user && <NavUser user={user} />}
      </SidebarFooter>
    </Sidebar>
  )
}
