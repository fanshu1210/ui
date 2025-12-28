import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Play, Share2, Github, Download, MoreVertical, MessageSquare, History, MapPin, Plus, ChevronDown, Send } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getAICode } from '../api/openai';

const WorkspacePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your Lyrasense AI assistant. Ask me to generate geospatial code for you.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [code, setCode] = useState('# Generated code will appear here...\n\n# Example:\n# def calculate_ndvi(image):\n#     return image.normalizedDifference(["B8", "B4"])');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const processedQuestionRef = useRef(null);
  const chatStartedRef = useRef(false);
  
  // 保存当前聊天到历史记录
  const saveChatToHistory = () => {
    // 只保存有用户消息的聊天
    const hasUserMessages = messages.some(msg => msg.role === 'user');
    
    if (!hasUserMessages) {
      console.log('Skipping save: no user messages');
      return;
    }
    
    console.log('Attempting to save chat history...');
    console.log('Current messages:', messages);
    
    // 从localStorage获取现有历史
    const savedHistory = localStorage.getItem('chatHistory');
    const chatHistory = savedHistory ? JSON.parse(savedHistory) : [];
    
    console.log('Existing chat history:', chatHistory);
    
    // 简化：不再检查重复，直接保存
    // 添加当前聊天到历史
    const newChat = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      messages: [...messages]
    };
    
    // 保存到localStorage
    localStorage.setItem('chatHistory', JSON.stringify([...chatHistory, newChat]));
    console.log('Chat saved to history:', newChat);
    console.log('Updated chat history count:', chatHistory.length + 1);
  };
  
  // 在用户发送消息后立即保存
  useEffect(() => {
    // 只保存有用户消息的聊天
    const hasUserMessages = messages.some(msg => msg.role === 'user');
    
    if (hasUserMessages) {
      // 简化：直接保存，不延迟
      saveChatToHistory();
    }
  }, [messages]);

  const handleSendMessage = async (prompt = inputValue) => {
    const userPrompt = prompt || inputValue;
    // 检查是否有内容、是否正在加载、是否正在处理
    if (!userPrompt.trim() || isLoading || isProcessing) return;
    
    // 检查该问题是否已经处理过
    if (processedQuestionRef.current === userPrompt) {
      console.log('Question already processed, skipping:', userPrompt);
      return;
    }

    // 设置正在处理状态
    setIsProcessing(true);
    const newUserMessage = { role: 'user', content: userPrompt };
    
    // 添加用户消息到列表
    setMessages(prev => {
      // 检查消息列表中是否已经有相同的消息
      const hasSameMessage = prev.some(msg => msg.role === 'user' && msg.content === userPrompt);
      if (hasSameMessage) {
        console.log('Same message already exists in list, skipping addition:', userPrompt);
        return prev;
      }
      return [...prev, newUserMessage];
    });
    
    // 总是清空输入框，无论是否有prompt参数
    setInputValue('');
    
    setIsLoading(true);
    processedQuestionRef.current = userPrompt;

    try {
        console.log('Calling getAICode with prompt:', userPrompt);
        const apiResponse = await getAICode(userPrompt);
        
        console.log('API Response received:', JSON.stringify(apiResponse, null, 2));
        
        // Extract content from API response (DeepSeek uses OpenAI format)
        let aiResponse = '';
        if (apiResponse && apiResponse.choices && Array.isArray(apiResponse.choices) && apiResponse.choices.length > 0) {
          if (apiResponse.choices[0].message && apiResponse.choices[0].message.content) {
            // Ensure aiResponse is always a string
            aiResponse = String(apiResponse.choices[0].message.content);
            console.log('Extracted AI Response (DeepSeek/OpenAI format):', aiResponse);
          } else {
            console.error('Message content not found in response:', apiResponse.choices[0]);
            throw new Error('Message content not found in API response');
          }
        } else {
          console.error('Unexpected API response format:', apiResponse);
          throw new Error('Invalid API response format');
        }
      
      // Basic cleanup to extract code from markdown if present
      let cleanCode = aiResponse;
      
      // Since we've already ensured aiResponse is a string earlier, we can safely call string methods
      if (aiResponse.includes('```')) {
        const matches = aiResponse.match(/```(?:python)?\s*([\s\S]*?)```/);
        if (matches && matches[1]) {
          cleanCode = matches[1];
          console.log('Extracted code block:', cleanCode);
        } else {
          // If strictly just code blocks are requested but mixed content returns,
          // we might just show the whole thing or try to clean it.
          cleanCode = aiResponse.replace(/```python|```/g, '');
          console.log('Cleaned code by removing backticks:', cleanCode);
        }
      }
      
      // Ensure cleanCode is also a string
      cleanCode = String(cleanCode);

      setMessages(prev => [...prev, { role: 'assistant', content: 'Code generated successfully! Check the editor.' }]);
      setCode(cleanCode);
    } catch (error) {
      console.error('Error fetching AI code:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message || 'Unknown error occurred.'}` }]);
    } finally {
      setIsLoading(false);
      setIsProcessing(false);
    }
  };

  // 当组件挂载时，如果没有URL参数，重置聊天会话
  useEffect(() => {
    const question = searchParams.get('question');
    if (!question) {
      // 没有URL参数，重置聊天会话
      setMessages([
        { role: 'assistant', content: 'Hello! I am your Lyrasense AI assistant. Ask me to generate geospatial code for you.' }
      ]);
      setCode('# Generated code will appear here...\n\n# Example:\n# def calculate_ndvi(image):\n#     return image.normalizedDifference(["B8", "B4"])');
      processedQuestionRef.current = null;
      chatStartedRef.current = false;
    }
  }, [searchParams]);
  
  // Auto-send question from URL query parameter when component mounts
  useEffect(() => {
    const question = searchParams.get('question');
    // 检查是否有问题、是否正在处理、是否已经处理过
    if (question && !isProcessing && processedQuestionRef.current !== question) {
      console.log('Auto-sending question:', question);
      // 调用handleSendMessage处理问题，handleSendMessage内部会处理重复检查
      handleSendMessage(question);
    }
  }, [searchParams, isProcessing]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="ml-64 bg-dark text-white min-h-screen flex overflow-hidden">
      
      {/* Left Panel: AI Chat */}
      <div className="w-1/3 border-r border-gray-700 flex flex-col bg-dark h-screen">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between shrink-0">
            <h2 className="font-semibold">AI Chat History</h2>
            <div className="flex bg-gray-800 rounded-md p-1">
                <button className="px-3 py-1 bg-accent rounded text-xs">Chat</button>
                <button 
                    className="px-3 py-1 text-gray-400 text-xs hover:text-white"
                    onClick={() => navigate('/history')}
                >
                    History
                </button>
            </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
                <div key={index} className={`p-4 rounded-lg border ${msg.role === 'user' ? 'bg-card border-gray-700' : 'bg-transparent border-transparent'}`}>
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-sm">{msg.role === 'user' ? 'You' : 'AI Agent'}</span>
                        <span className="text-xs text-gray-500">{new Date().toLocaleTimeString()}</span>
                    </div>
                    <p className="text-gray-300 text-sm whitespace-pre-wrap">
                        {msg.content}
                    </p>
                </div>
            ))}
            
            {isLoading && (
                <div className="flex items-center gap-2 text-gray-400 text-sm pl-4">
                    <span>LYRASENSE Processing...</span>
                </div>
            )}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-gray-700 shrink-0">
            <div className="flex items-center gap-4 mb-2">
                 <button className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                     <MapPin size={12} /> Select Location
                 </button>
                 <button className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
                     <Plus size={12} /> Add Blocks
                 </button>
            </div>
            <div className="relative">
                <textarea 
                    className="w-full bg-card rounded-lg border border-gray-700 p-3 text-sm text-white placeholder-gray-500 resize-none outline-none focus:border-accent h-24 pr-10"
                    placeholder="Ask me to generate code (e.g., 'Calculate NDVI for Sentinel-2 image')..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                ></textarea>
                <button 
                    className="absolute bottom-2 right-2 text-gray-400 hover:text-accent disabled:opacity-50"
                    onClick={handleSendMessage}
                    disabled={isLoading}
                >
                    <Send size={16} />
                </button>
            </div>
            <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">Connected</span>
                <span className="text-xs text-gray-500">Press Enter to send</span>
            </div>
        </div>
      </div>

      {/* Right Panel: Code Editor */}
      <div className="flex-1 flex flex-col bg-dark h-screen overflow-hidden">
        {/* Editor Toolbar */}
        <div className="h-12 border-b border-gray-700 flex items-center justify-between px-4 shrink-0">
             <div className="flex items-center gap-2 text-sm text-gray-400">
                 <span>Dimi's Lyrasense Sandbox Default Project</span>
                 <span>&gt;</span>
                 <span>Demo Notebook</span>
                 <ChevronDown size={12} />
             </div>
             <div className="flex items-center gap-2">
                 <button className="p-1.5 text-gray-400 hover:text-white"><MessageSquare size={16} /></button>
                 <button 
                     className="p-1.5 text-gray-400 hover:text-white" 
                     onClick={() => navigate('/history')}
                     title="View Chat History"
                 >
                     <History size={16} />
                 </button>
                 <button className="flex items-center gap-1 px-3 py-1.5 bg-card border border-gray-700 rounded text-xs hover:bg-gray-700">
                     <Play size={12} /> Run <ChevronDown size={12} />
                 </button>
                 <button className="flex items-center gap-1 px-3 py-1.5 bg-card border border-gray-700 rounded text-xs hover:bg-gray-700">
                     <Share2 size={12} /> Publish
                 </button>
                 <button className="flex items-center gap-1 px-3 py-1.5 bg-card border border-gray-700 rounded text-xs hover:bg-gray-700">
                     <Github size={12} /> GitHub
                 </button>
                 <button className="flex items-center gap-1 px-3 py-1.5 bg-card border border-gray-700 rounded text-xs hover:bg-gray-700">
                     <Download size={12} /> Import
                 </button>
             </div>
        </div>

        {/* Code Area */}
        <div className="flex-1 overflow-auto bg-[#1e1e30] relative">
            <SyntaxHighlighter 
                language="python" 
                style={vscDarkPlus}
                customStyle={{ margin: 0, padding: '1.5rem', height: '100%', fontSize: '14px', lineHeight: '1.5', background: 'transparent' }}
                showLineNumbers={true}
                wrapLines={true}
            >
                {code}
            </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default WorkspacePage;