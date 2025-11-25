import api from "@/lib/axios";
import type { ConversationResponse, Message } from "@/types/chat";
import { useAuthStore } from "@/stores/useAuthStore";

interface FetchMessageProps {
  messages: Message[];
  cursor?: string;
}

const pageLimit = 50;

export const chatService = {
  async fetchConversations(): Promise<ConversationResponse> {
    const { accessToken } = useAuthStore.getState(); // lấy accessToken từ store
    const res = await api.get("/conversations", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  },

  async fetchMessages(id: string, cursor?: string): Promise<FetchMessageProps> {
    const { accessToken } = useAuthStore.getState();
    const res = await api.get(
      `/conversations/${id}/messages?limit=${pageLimit}&cursor=${cursor}`,
      { headers: { Authorization: `Bearer ${accessToken}` } } // gắn accessToken
    );

    return { messages: res.data.messages, cursor: res.data.nextCursor };
  },

  async sendDirectMessage(
    recipientId: string,
    content: string = "",
    imgUrl?: string,
    conversationId?: string
  ) {
      const { accessToken } = useAuthStore.getState(); // lấy token

      const res = await api.post(
      '/messages/direct',
      { recipientId, content, imgUrl, conversationId },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    return res.data.messages;
  },


  async sendGroupMessage(conversationId: string, content: string = "", imgUrl?: string) {
    const res = await api.post('/messages/group',{
      conversationId, content, imgUrl
    });

    return res.data.messages;
  },
  
};
