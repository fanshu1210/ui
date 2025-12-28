import React from 'react';
import { ArrowRight } from 'lucide-react';

const SDKDocsPage = () => {
  return (
    <div className="ml-64 bg-dark text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-4">LYRASENSE SDKs</h1>
          <p className="text-gray-400 text-lg">
            Explore the LYRASENSE SDKs to build powerful geospatial applications and data pipelines.
          </p>
        </div>

        {/* SDK Cards */}
        <div className="space-y-6">
          {/* Map SDK Card */}
          <div className="bg-card rounded-xl border border-gray-700 p-8 shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">LYRASENSE Map SDK</h2>
                <p className="text-gray-400">
                  A purpose-built geospatial mapping library for Google Earth Engine integration and interactive visualization.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center gap-2">
                Quick Start <ArrowRight size={16} />
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center gap-2">
                Examples <ArrowRight size={16} />
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center gap-2">
                API Reference <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Data SDK Card */}
          <div className="bg-card rounded-xl border border-gray-700 p-8 shadow-lg">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="3" rx="2"/>
                  <line x1="8" x2="16" y1="21" y2="21"/>
                  <line x1="12" x2="12" y1="17" y2="21"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-semibold mb-2">LYRASENSE Data SDK</h2>
                  <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full">Coming Soon</span>
                </div>
                <p className="text-gray-400">
                  Powerful tools for data processing, analysis, and manipulation within the LYRASENSE platform.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center gap-2 cursor-not-allowed opacity-60">
                Quick Start <ArrowRight size={16} />
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center gap-2 cursor-not-allowed opacity-60">
                Examples <ArrowRight size={16} />
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors font-medium flex items-center gap-2 cursor-not-allowed opacity-60">
                API Reference <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SDKDocsPage;