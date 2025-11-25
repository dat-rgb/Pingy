import { useChatStore } from '@/stores/useChatStore'
import React from 'react'
import GroupChatCard from './GroupChatCard';

const CroupChatList = () => {
  const {conversations} = useChatStore();

  if(!conversations) return;

  const groupChats = conversations.filter(
    (convo) => convo.type === 'group'
  );

  return (
    <div className="flex-1 overflow-auto p-2 space-y-2">
      {
        groupChats.map((convo) => (
          <GroupChatCard 
            convo={convo}
            key={convo._id}
          />
        ))
      }
    </div>
  )
}

export default CroupChatList
