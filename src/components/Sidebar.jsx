import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Layout, 
  Globe, 
  Bot, 
  BookOpen, 
  ChevronDown, 
  ChevronRight, 
  MessageSquare, 
  Folder, 
  Plus, 
  Search,
  Settings
} from 'lucide-react';

const Sidebar = () => {
  const [projectsExpanded, setProjectsExpanded] = useState(true);
  const [chatsExpanded, setChatsExpanded] = useState(false);

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Workspace', icon: Layout, path: '/workspace' },
    { name: 'Public Gallery', icon: Globe, path: '/gallery' },
    { name: 'Agentic Automations', icon: Bot, path: '/automations' },
    { name: 'SDK Docs', icon: BookOpen, path: '/docs' },
  ];

  return (
    <div className="bg-dark text-white w-64 h-screen fixed left-0 top-0 z-50 flex flex-col border-r border-gray-700">
      {/* User Profile / Logo area */}
      <div className="p-4 border-b border-gray-700 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent to-purple-500 flex items-center justify-center text-white font-bold">
            U
        </div>
        <div className="flex flex-col">
            <span className="text-sm font-semibold text-white">番薯大王</span>
            <span className="text-xs text-gray-400">Free Plan</span>
        </div>
        <ChevronDown size={14} className="ml-auto cursor-pointer" />
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive 
                    ? 'bg-accent/20 text-accent' 
                    : 'hover:bg-card hover:text-white'
                }`
              }
            >
              <item.icon size={18} />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Projects Section */}
        <div className="mt-6 px-2">
          <div 
            className="flex items-center justify-between px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-300"
            onClick={() => setProjectsExpanded(!projectsExpanded)}
          >
            <div className="flex items-center gap-1">
                {projectsExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                Projects (1)
            </div>
            <div className="flex gap-1">
                <Search size={12} className="cursor-pointer hover:text-white" />
                <Plus size={12} className="cursor-pointer hover:text-white" />
            </div>
          </div>
          
          {projectsExpanded && (
            <div className="mt-1 space-y-1">
              <div className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-card rounded-md cursor-pointer border-l-2 border-green-500 ml-2">
                 <span className="w-2 h-2 rounded-full bg-green-500"></span>
                 Default Project
              </div>
            </div>
          )}
        </div>

        {/* Chats Section */}
        <div className="mt-4 px-2">
            <div 
            className="flex items-center justify-between px-3 py-1 text-xs font-semibold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-300"
            onClick={() => setChatsExpanded(!chatsExpanded)}
          >
            <div className="flex items-center gap-1">
                {chatsExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                Chats
            </div>
            <div className="flex gap-1">
                <Search size={12} className="cursor-pointer hover:text-white" />
                <Plus size={12} className="cursor-pointer hover:text-white" />
            </div>
          </div>
          {chatsExpanded && (
              <div className="mt-1 px-4 text-xs text-gray-500 italic">
                  No chats yet
              </div>
          )}
           {!chatsExpanded && (
              <div className="mt-1 px-4 text-xs text-gray-500 italic">
                  No chats yet
              </div>
          )}
        </div>
      </div>

      {/* Footer / Files */}
      <div className="p-2 border-t border-gray-700">
         <div className="px-3 py-2 flex items-center gap-3 text-sm text-gray-400 hover:text-white cursor-pointer rounded-md hover:bg-card">
            <Folder size={18} />
            Files
         </div>
         <div className="mt-2 flex items-center gap-3 px-3 py-2 bg-card rounded-md">
            <div className="w-8 h-8 rounded bg-accent/20 flex items-center justify-center text-accent">
                <span className="text-xs font-mono">ID</span>
            </div>
            <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold text-white truncate">2971329974</span>
                <span className="text-[10px] text-gray-500 truncate">2971329974@qq....</span>
            </div>
             <ChevronDown size={14} className="ml-auto text-gray-500" />
         </div>
      </div>
    </div>
  );
};

export default Sidebar;
