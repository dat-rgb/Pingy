import mongoose from 'mongoose';

const messsageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        requried: true,
        index: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requried: true,
    },
    content: {
        type: String,
        trim: true,
    },
    imgUrl: {
        type: String,
    }
},{timestamps: true});

messsageSchema.index({conversationId: 1, createdAt: -1});


const Message = mongoose.model("Message", messsageSchema);

export default Message;