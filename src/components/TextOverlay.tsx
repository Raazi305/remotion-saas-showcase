// TextOverlay - Animated text overlay using Remotion spring
import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const TextOverlay: React.FC<{
    title: string;
    subtitle?: string;
    align?: 'left' | 'right' | 'center';
    show: boolean;
}> = ({ title, subtitle, align = 'right', show }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const enter = spring({
        frame: frame,
        fps,
        config: { damping: 200 },
        durationInFrames: 30,
    });

    if (!show) return null;

    return (
        <div style={{
            position: 'absolute',
            top: '42%',
            left: 0,
            width: '100%',
            opacity: enter,
            transform: 'translateY(0)',
            zIndex: 2000,
        }}>
            <div className={`
                absolute top-0 w-[600px]
                ${align === 'left' ? 'left-[150px] text-left' : align === 'right' ? 'right-[150px] text-right' : 'left-1/2 -translate-x-1/2 text-center'}
            `}>
                <h2 className="text-6xl font-black text-slate-900 tracking-tight leading-tight mb-4 drop-shadow-sm">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-3xl text-slate-500 font-medium leading-relaxed">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
};
