import React from 'react';
import { MessageSquare } from 'lucide-react';

const HistoryPage = () => {
  // 从localStorage获取聊天历史
  const [chatHistory, setChatHistory] = React.useState([]);

  React.useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    }
  }, []);

  return (
    <div className="ml-64 bg-dark text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Chat History</h1>
        
        {chatHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <MessageSquare size={64} className="mb-4" />
            <p className="text-lg">No chat history yet</p>
            <p className="text-sm mt-2">Start a conversation in Workspace to see history here</p>
          </div>
        ) : (
          <div className="space-y-6">
            {chatHistory.map((chat, index) => (
              <div key={index} className="bg-card rounded-xl border border-gray-700 p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Chat {index + 1}</h3>
                  <span className="text-sm text-gray-400">{chat.timestamp}</span>
                </div>
                <div className="space-y-4">
                  {chat.messages.map((msg, msgIndex) => (
                    <div key={msgIndex} className={`p-4 rounded-lg ${msg.role === 'user' ? 'bg-primary/20' : 'bg-gray-800'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{msg.role === 'user' ? 'You' : 'AI Agent'}</span>
                      </div>
                      <p className="text-gray-300">{msg.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;