import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { updateConversationAfterCreateMessage } from "../utils/messageHelper.js";

export const sendDirectMessage = async (req, res) => {
    try {
        const { recipientId, content, conversationId } = req.body;
        const senderId = req.user._id;   // req.user phải tồn tại

        if (!content) {
            return res.status(400).json({ message: "Thiếu nội dung" });
        }

        let conversation;

        // Nếu đã có conversationId -> dùng lại
        if (conversationId) {
            conversation = await Conversation.findById(conversationId);
        }

        // Nếu chưa -> tạo conversation mới
        if (!conversation) {
            conversation = await Conversation.create({
                type: "direct",
                participants: [
                    { userId: senderId, joinedAt: new Date() },
                    { userId: recipientId, joinedAt: new Date() }
                ],
                lastMessageAt: new Date(),
                unreadCounts: new Map()
            });
        }

        const message = await Message.create({
            conversationId: conversation._id,
            senderId,
            content,
        });

        updateConversationAfterCreateMessage(conversation, message, senderId);
        await conversation.save();

        return res.status(201).json({ message });
    } catch (error) {
        console.error("Lỗi xảy ra khi gửi tin nhắn trực tiếp", error);
        return res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

export const sendGroupMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const senderId = req.user._id;
    const conversation = req.conversation;

    if (!content) {
      return res.status(400).json({ message: "Thiếu nội dung" });
    }

    const message = await Message.create({
      conversationId: conversation._id,
      senderId,
      content,
    });

    updateConversationAfterCreateMessage(conversation, message, senderId);
    await conversation.save();

    return res.status(201).json({ message });
  } catch (error) {
    console.error("Lỗi xảy ra khi gửi tin nhắn nhóm", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
