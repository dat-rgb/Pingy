import { create } from 'zustand';
import { io, type Socket } from 'socket.io-client';
import { useAuthStore } from './useAuthStore';
import type { SocketState } from '@/types/store';
import { useChatStore } from './useChatStore';

const baseUrl = import.meta.env.VITE_SOCKET_URL;

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  onlineUsers: [],
  connectSocket: () => {
    const { accessToken } = useAuthStore.getState();
    const existingSocket = get().socket;

    if(existingSocket) return;

    const socket: Socket = io(baseUrl, {
        auth: {token: accessToken},
        transports: ["websocket"]
    });

    set({socket});

    socket.on("connect", () => {
        console.log("Đã kết nối với socket");
    });

    //online users
    socket.on("online-users", (userIds) => {
      set({onlineUsers: userIds});
    });

    // new message
    socket.on("new-message", ({message, conversation, unreadCount}) => {
      useChatStore.getState().addMessage(message);

      const lastMessage = {
        _id: conversation.lastMessage._id,
        content: conversation.lastMessage.content,
        createdAt: conversation.lastMessage.createdAt,
        seeder: {
          _id: conversation.lastMessage.senderId,
          displayName: "",
          avatarUrl: null,
        }
      };

      const updateConversation = {
        ...conversation,
        lastMessage,
        unreadCount
      }

      if(useChatStore.getState().activeConversationId === message.conversationId){
        // đánh dấu đã đọc
      } 
      
      useChatStore.getState().updateConversation(updateConversation);
    })



  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));
