// Indicator - Visual focus indicator for guiding viewer attention
import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface IndicatorProps {
    x: number;
    y: number;
    width?: number;
    height?: number;
    type?: 'box' | 'pointer' | 'circle';
    color?: string;
    label?: string;
}

export const Indicator: React.FC<IndicatorProps> = ({
    x,
    y,
    width = 100,
    height = 40,
    type = 'box',
    color = 'rgba(34, 197, 94, 0.8)',
    label,
}) => {
    const frame = useCurrentFrame();

    const pulse = interpolate(
        Math.sin(frame * 0.15),
        [-1, 1],
        [0.8, 1.2],
    );

    const opacity = interpolate(frame % 60, [0, 15], [0, 1], {
        extrapolateRight: 'clamp',
    });

    if (type === 'pointer') {
        return (
            <div
                className="absolute z-50 pointer-events-none"
                style={{
                    left: x,
                    top: y,
                    opacity,
                    transform: `scale(${pulse})`,
                    transformOrigin: 'center center',
                }}
            >
                <div className="text-4xl animate-bounce">👆</div>
                {label && (
                    <div className="mt-2 bg-gray-900/80 text-white text-sm px-3 py-1 rounded-full whitespace-nowrap">
                        {label}
                    </div>
                )}
            </div>
        );
    }

    if (type === 'circle') {
        return (
            <div
                className="absolute z-50 pointer-events-none rounded-full border-4"
                style={{
                    left: x - width / 2,
                    top: y - height / 2,
                    width,
                    height,
                    borderColor: color,
                    opacity,
                    transform: `scale(${pulse})`,
                    boxShadow: `0 0 20px ${color}`,
                }}
            />
        );
    }

    // Default: box highlight
    return (
        <div
            className="absolute z-50 pointer-events-none"
            style={{ left: x, top: y, width, height, opacity }}
        >
            <div
                className="absolute inset-0 rounded-lg border-2"
                style={{
                    borderColor: color,
                    boxShadow: `0 0 15px ${color}`,
                    transform: `scale(${pulse})`,
                    transformOrigin: 'center center',
                }}
            />
            {label && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900/80 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                    {label}
                </div>
            )}
        </div>
    );
};
