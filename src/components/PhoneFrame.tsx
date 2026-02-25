// PhoneFrame - Simulates an iPhone frame for showcase videos
import React from 'react';

interface PhoneFrameProps {
    children: React.ReactNode;
    className?: string;
    screenStyle?: React.CSSProperties;
    statusBarStyle?: React.CSSProperties;
    /** Time displayed in the status bar. Default: '14:30' */
    time?: string;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
    children,
    className = '',
    screenStyle = {},
    statusBarStyle = {},
    time = '14:30',
}) => {
    return (
        <div
            className={`relative ${className}`}
            style={{
                width: 390,
                height: 844,
                overflow: 'hidden',
                borderRadius: '3rem',
                clipPath: 'inset(0 round 3rem)',
            }}
        >
            {/* Phone Bezel */}
            <div className="absolute inset-0 bg-gray-900 rounded-[3rem] shadow-2xl border-4 border-gray-800">
                {/* Dynamic Island */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-8 bg-black rounded-full z-20" />

                {/* Screen Area */}
                <div
                    className="absolute inset-3 rounded-[2.25rem] overflow-hidden"
                    style={{
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden',
                        clipPath: 'inset(0px round 2.25rem)',
                        backgroundColor: 'white',
                        ...screenStyle,
                    }}
                >
                    {/* Status Bar */}
                    <div
                        className="h-12 flex items-center justify-between px-6 text-sm font-semibold"
                        style={{ backgroundColor: 'white', color: '#111827', ...statusBarStyle }}
                    >
                        <span className="w-16">{time}</span>
                        <div className="w-28" />
                        <div className="w-16 flex items-center justify-end gap-1">
                            {/* Cellular Signal */}
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <rect x="1" y="14" width="4" height="6" rx="1" />
                                <rect x="7" y="10" width="4" height="10" rx="1" />
                                <rect x="13" y="6" width="4" height="14" rx="1" />
                                <rect x="19" y="2" width="4" height="18" rx="1" />
                            </svg>
                            {/* WiFi */}
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                            </svg>
                            {/* Battery */}
                            <div className="w-6 h-3 border border-gray-900 rounded-sm relative">
                                <div className="absolute inset-0.5 bg-green-500 rounded-sm" style={{ width: '75%' }} />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="h-[calc(100%-3rem)] overflow-hidden">
                        {children}
                    </div>
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-600 rounded-full" />
            </div>
        </div>
    );
};
