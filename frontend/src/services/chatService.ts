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
};
