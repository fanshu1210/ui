import React from 'react';
import { Send, ChevronDown, HelpCircle, ArrowRight, ChevronRight } from 'lucide-react';
import TemplateCard from '../components/TemplateCard';

const HomePage = () => {
  const templates = [
    {
      title: "Methane Emissions | Sentinel-5p",
      tags: ["Energy", "Nature"],
      thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600",
      description: "Analyze methane emissions using Sentinel-5p data."
    },
    {
      title: "Open Street Map (OSM) Overpass + Python Examples",
      tags: ["Building", "Transit", "Urban"],
      thumbnail: "https://images.unsplash.com/photo-1577086663218-615d023e1987?auto=format&fit=crop&q=80&w=600",
      description: "Query OSM data using Overpass API and visualize with Python."
    },
    {
      title: "Sand Encroachment - Saudi Arabia",
      tags: ["Urban", "Public"],
      thumbnail: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=600",
      description: "Monitor sand encroachment in urban areas of Saudi Arabia."
    },
    {
        title: "Urban Heat Island Effect",
        tags: ["Urban", "Public"],
        thumbnail: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=600",
        description: "Analyze urban heat island effects in major cities."
    }
  ];

  return (
    <div className="ml-64 bg-dark text-gray-100 min-h-screen p-8">
      
      {/* Welcome Section */}
      <div className="max-w-4xl mx-auto mt-10 mb-16 text-center">
        <h1 className="text-4xl font-bold mb-8 text-white">Welcome 逢时!</h1>
        
        {/* Input Area */}
        <div className="bg-card rounded-xl border border-gray-700 p-4 shadow-lg relative">
            <textarea 
                className="w-full bg-transparent text-white placeholder-gray-500 resize-none outline-none h-20"
                placeholder="Ask me anything geospatial and I'll help you build it..."
            />
            
            <div className="flex items-center justify-between mt-4 border-t border-gray-700 pt-3">
                <button className="flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium">
                    Agent <ChevronDown size={14} />
                </button>
                <button className="bg-accent hover:bg-opacity-90 text-white p-2 rounded-lg transition-colors">
                    <Send size={18} />
                </button>
            </div>
            
             <div className="absolute -bottom-12 left-0 flex items-center justify-between w-full px-2">
                 <button className="flex items-center gap-2 px-4 py-2 bg-card border border-gray-700 rounded-full text-sm text-gray-300 hover:text-white hover:border-gray-500 transition-colors">
                     <span className="w-4 h-4 border border-gray-500 rounded flex items-center justify-center text-[10px]">P</span>
                     Suggestions
                     <ChevronRight size={14} />
                 </button>
                 <HelpCircle className="text-gray-500 hover:text-white cursor-pointer" size={24} />
             </div>
        </div>
      </div>

      {/* Templates Section */}
      <div className="max-w-6xl mx-auto mt-20">
        <div className="flex items-center justify-between mb-4">
            <div>
                <h2 className="text-xl font-bold text-white">Start From a Template</h2>
                <p className="text-gray-400 text-sm">Get started quickly with pre-built applications and workflows.</p>
            </div>
            <a href="#" className="text-sm text-gray-400 hover:text-white flex items-center gap-1">
                View all templates <ArrowRight size={14} />
            </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((template, index) => (
            <TemplateCard key={index} {...template} />
          ))}
        </div>
      </div>

      {/* Your Notebooks (Empty State) */}
       <div className="max-w-6xl mx-auto mt-16 mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
                <h2 className="text-xl font-bold text-white">Your Notebooks</h2>
                <p className="text-gray-400 text-sm">Access and manage your AI-powered notebooks and projects.</p>
            </div>
            <button className="bg-accent/20 text-accent text-xs px-3 py-1.5 rounded border border-accent/40 flex items-center gap-2">
                Showing: All Projects <ChevronDown size={12} />
            </button>
          </div>
          
          <div className="h-32 flex items-center justify-center text-gray-500 text-sm border border-dashed border-gray-700 rounded-lg">
              No notebooks found in this project
          </div>
       </div>

    </div>
  );
};

export default HomePage;
