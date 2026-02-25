// NumberTicker - Animated number counter using Remotion interpolate
import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

interface NumberTickerProps {
    value: number;
    prevValue: number;
    className?: string;
    animationStartFrame: number;
    /** Duration in frames. Default: 30 */
    duration?: number;
}

export const NumberTicker: React.FC<NumberTickerProps> = ({
    value,
    prevValue,
    className = '',
    animationStartFrame,
    duration = 30,
}) => {
    const frame = useCurrentFrame();

    const progress = interpolate(
        frame,
        [animationStartFrame, animationStartFrame + duration],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
    );

    const displayValue = Math.round(prevValue + (value - prevValue) * progress);

    return <span className={className}>{displayValue}</span>;
};

/** Simpler version that animates from 0 to target value */
export const AnimatedNumber: React.FC<{
    value: number;
    className?: string;
    startFrame?: number;
    duration?: number;
}> = ({ value, className = '', startFrame = 0, duration = 45 }) => {
    const frame = useCurrentFrame();

    const progress = interpolate(
        frame,
        [startFrame, startFrame + duration],
        [0, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
    );

    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    const displayValue = Math.round(value * eased);

    return <span className={className}>{displayValue}</span>;
};
