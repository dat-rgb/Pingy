import { useChatStore } from '@/stores/useChatStore'
import DirectMessageCard from './DirectMessageCard';

const DireactMessageList = () => {
  const {conversations} = useChatStore();

  if(!conversations) return;

  const directConversation = conversations.filter((convo) => convo.type === 'direct');

  return (
    <div className="flex-1 overflow-auto p-2 space-y-2">
      {
        directConversation.map((convo) => (
          <DirectMessageCard 
            convo={convo}
            key={convo._id}
          />
        ))
      }
    </div>
  )
}

export default DireactMessageList
