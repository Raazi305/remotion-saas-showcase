// BrowserFrame - Simulates a macOS browser window
import React from 'react';

interface BrowserFrameProps {
    children: React.ReactNode;
    /** URL displayed in the address bar. Default: 'app.example.com' */
    url?: string;
    className?: string;
    style?: React.CSSProperties;
}

export const BrowserFrame: React.FC<BrowserFrameProps> = ({
    children,
    url = 'app.example.com',
    className = '',
    style = {},
}) => {
    return (
        <div
            className={`flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200/50 ${className}`}
            style={{
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                ...style,
            }}
        >
            {/* Browser Header / Toolbar */}
            <div className="bg-[#f6f6f6] border-b border-[#dadada] h-10 flex items-center px-4 shrink-0 gap-4">
                {/* Traffic Lights */}
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]" />
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24]" />
                    <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29]" />
                </div>

                {/* Navigation Controls */}
                <div className="flex gap-2 text-[#8c8c8c]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </div>

                {/* URL Bar */}
                <div className="flex-1 flex justify-center">
                    <div className="bg-white border border-[#dadada] rounded text-xs text-gray-500 h-6 flex items-center justify-center px-3 w-full max-w-[400px] gap-2 shadow-sm">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span className="truncate">{url}</span>
                    </div>
                </div>

                {/* Spacer */}
                <div className="w-16" />
            </div>

            {/* Content Area */}
            <div className="flex-1 relative bg-white overflow-hidden">
                {children}
            </div>
        </div>
    );
};
