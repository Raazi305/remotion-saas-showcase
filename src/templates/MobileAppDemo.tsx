// MobileAppDemo - Template showcasing a mobile app flow
import React from 'react';
import { Composition } from 'remotion';
import { useCurrentFrame, interpolate, spring, useVideoConfig, AbsoluteFill } from 'remotion';
import { PhoneFrame, Cursor, BaseButton, BaseInput } from '../components';

// ---------------------------------------------------------------------------
// Demo Scene: A generic mobile sign-up + dashboard flow
// ---------------------------------------------------------------------------

const DEMO_DURATION = 300; // 10 seconds @ 30fps

const MobileAppScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // --- Timeline ---
    // Phase 1: Title (0-50)    → Title enters with spring, subtitle staggers
    // Phase 2: Phone (40-70)   → Title exits, phone springs in from bottom
    // Phase 3: Form (70-145)   → Cursor appears, types email, fills password
    // Phase 4: Submit (145-170) → Click sign-up button
    // Phase 5: Success (170-210) → Success modal springs in
    // Phase 6: Dashboard (210-270) → Crossfade to dashboard
    // Phase 7: Outro (270-300) → Everything fades out

    // ── Phase 1: Title ──────────────────────────────────────────────────
    const titleEnter = spring({ frame, fps, config: { damping: 15, mass: 0.8 }, durationInFrames: 25 });
    const subtitleEnter = spring({ frame: Math.max(0, frame - 8), fps, config: { damping: 15 }, durationInFrames: 25 });
    const titleExit = interpolate(frame, [40, 55], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const titleY = interpolate(frame, [40, 55], [0, -40], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // ── Phase 2: Phone entrance ─────────────────────────────────────────
    const phoneSpring = spring({ frame: Math.max(0, frame - 45), fps, config: { damping: 14, mass: 1.2 }, durationInFrames: 35 });
    const phoneY = interpolate(phoneSpring, [0, 1], [120, 0]);
    const phoneScale = interpolate(phoneSpring, [0, 1], [0.85, 1]);

    // ── Phase 3: Cursor + Typing ────────────────────────────────────────
    const cursorX = interpolate(
        frame,
        [70, 85, 140, 148],
        [350, 195, 195, 195],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
    );
    const cursorY = interpolate(
        frame,
        [70, 85, 140, 148],
        [250, 340, 340, 420],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
    );
    const isClicking = (frame >= 148 && frame <= 153);
    const cursorOpacity = interpolate(frame, [68, 75, 200, 210], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Email typing
    const emailText = 'user@example.com';
    const charsToShow = Math.min(
        Math.floor(interpolate(frame, [90, 120], [0, emailText.length], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        })),
        emailText.length,
    );
    const typedEmail = emailText.slice(0, charsToShow);

    // ── Phase 5: Success modal ──────────────────────────────────────────
    const showSuccess = frame >= 158;
    const successScale = showSuccess ? spring({
        frame: frame - 158,
        fps,
        config: { damping: 12, stiffness: 150 },
    }) : 0;
    const successBgOpacity = showSuccess ? interpolate(frame, [158, 168], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    }) : 0;

    // ── Phase 6: Dashboard transition ───────────────────────────────────
    const showDashboard = frame >= 215;
    const dashboardSlide = showDashboard ? spring({
        frame: frame - 215,
        fps,
        config: { damping: 18, mass: 0.8 },
        durationInFrames: 25,
    }) : 0;
    const dashboardY = interpolate(dashboardSlide, [0, 1], [30, 0]);

    // ── Phase 7: Outro ──────────────────────────────────────────────────
    const fadeOut = interpolate(frame, [275, 298], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const outroScale = interpolate(frame, [275, 298], [1, 0.95], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill style={{ opacity: fadeOut, transform: `scale(${outroScale})` }}>
            {/* Animated gradient background */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
            />
            {/* Subtle animated glow */}
            <div
                className="absolute rounded-full"
                style={{
                    width: 600,
                    height: 600,
                    top: '20%',
                    left: '60%',
                    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    transform: `translate(-50%, -50%) scale(${1 + Math.sin(frame * 0.02) * 0.1})`,
                }}
            />

            {/* Title Card */}
            {frame < 65 && (
                <div
                    className="absolute top-[18%] left-0 w-full text-center"
                    style={{
                        opacity: titleExit,
                        transform: `translateY(${titleY}px)`,
                    }}
                >
                    <h1
                        className="text-6xl font-extrabold text-white drop-shadow-lg tracking-tight"
                        style={{
                            opacity: titleEnter,
                            transform: `translateY(${interpolate(titleEnter, [0, 1], [30, 0])}px)`,
                        }}
                    >
                        📱 Mobile App Demo
                    </h1>
                    <p
                        className="text-2xl text-white/70 mt-5 font-light tracking-wide"
                        style={{
                            opacity: subtitleEnter,
                            transform: `translateY(${interpolate(subtitleEnter, [0, 1], [20, 0])}px)`,
                        }}
                    >
                        Sign-up → Dashboard Flow
                    </p>
                </div>
            )}

            {/* Phone */}
            <div
                className="absolute left-1/2 top-1/2"
                style={{
                    transform: `translate(-50%, -50%) translateY(${phoneY}px) scale(${phoneScale})`,
                    opacity: phoneSpring,
                }}
            >
                <PhoneFrame screenStyle={{ backgroundColor: '#ffffff' }}>
                    {!showDashboard ? (
                        /* Sign-Up Form */
                        <div className="p-6 pt-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome 👋</h2>
                            <p className="text-gray-500 mb-8">Create your account to get started</p>

                            <BaseInput
                                label="Email"
                                placeholder="you@example.com"
                                value={typedEmail}
                                readOnly
                                containerClassName="mb-4"
                            />

                            <BaseInput
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                value={frame > 90 ? '••••••••' : ''}
                                readOnly
                                containerClassName="mb-6"
                            />

                            <BaseButton
                                isFullWidth
                                variant="primary"
                                size="lg"
                                style={{
                                    transform: isClicking ? 'scale(0.96)' : 'scale(1)',
                                    transition: 'transform 0.1s ease',
                                }}
                            >
                                Sign Up
                            </BaseButton>

                            <p className="text-center text-sm text-gray-400 mt-4">
                                Already have an account? <span className="text-indigo-600">Log in</span>
                            </p>

                            {/* Success Modal */}
                            {showSuccess && !showDashboard && (
                                <div
                                    className="absolute inset-0 flex items-center justify-center"
                                    style={{ backgroundColor: `rgba(0,0,0,${0.3 * successBgOpacity})` }}
                                >
                                    <div
                                        className="bg-white rounded-2xl p-8 mx-6 text-center shadow-2xl"
                                        style={{
                                            transform: `scale(${successScale})`,
                                            opacity: successScale,
                                        }}
                                    >
                                        <div className="text-5xl mb-4 animate-bounce">✅</div>
                                        <h3 className="text-xl font-bold text-gray-900">Account Created!</h3>
                                        <p className="text-gray-500 mt-2">Redirecting to dashboard...</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Dashboard */
                        <div
                            className="bg-gray-50 h-full"
                            style={{
                                opacity: dashboardSlide,
                                transform: `translateY(${dashboardY}px)`,
                            }}
                        >
                            <div className="bg-indigo-600 p-6 pb-12">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-indigo-200 text-sm">Good morning</p>
                                        <p className="text-white text-xl font-bold">User 👋</p>
                                    </div>
                                    <div className="w-10 h-10 bg-white/20 rounded-full" />
                                </div>
                            </div>

                            {/* Stats Cards - staggered entrance */}
                            <div className="px-4 -mt-6 grid grid-cols-2 gap-3">
                                {[
                                    { label: 'Total Users', value: '1,234', icon: '👥' },
                                    { label: 'Revenue', value: '$5.6K', icon: '💰' },
                                    { label: 'Orders', value: '89', icon: '📦' },
                                    { label: 'Growth', value: '+12%', icon: '📈' },
                                ].map((stat, i) => {
                                    const cardSpring = showDashboard ? spring({
                                        frame: Math.max(0, frame - 220 - i * 4),
                                        fps,
                                        config: { damping: 14 },
                                    }) : 0;
                                    return (
                                        <div
                                            key={stat.label}
                                            className="bg-white rounded-xl p-4 shadow-sm"
                                            style={{
                                                opacity: cardSpring,
                                                transform: `translateY(${interpolate(cardSpring, [0, 1], [15, 0])}px)`,
                                            }}
                                        >
                                            <div className="text-2xl mb-1">{stat.icon}</div>
                                            <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                                            <div className="text-xs text-gray-500">{stat.label}</div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Recent Activity */}
                            <div className="px-4 mt-4">
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">Recent Activity</h3>
                                {['New order #1234', 'User signed up', 'Payment received'].map((item, i) => {
                                    const actSpring = showDashboard ? spring({
                                        frame: Math.max(0, frame - 240 - i * 5),
                                        fps,
                                        config: { damping: 14 },
                                    }) : 0;
                                    return (
                                        <div
                                            key={item}
                                            className="bg-white rounded-lg p-3 mb-2 shadow-sm flex items-center gap-3"
                                            style={{
                                                opacity: actSpring,
                                                transform: `translateX(${interpolate(actSpring, [0, 1], [20, 0])}px)`,
                                            }}
                                        >
                                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-sm">
                                                {['📦', '👤', '💳'][i]}
                                            </div>
                                            <div className="text-sm text-gray-700">{item}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PhoneFrame>

                {/* Cursor */}
                <Cursor x={cursorX} y={cursorY} isClicking={isClicking} opacity={cursorOpacity} />
            </div>
        </AbsoluteFill>
    );
};

// ---------------------------------------------------------------------------
// Composition Registration
// ---------------------------------------------------------------------------
export const MobileAppDemo: React.FC = () => {
    return (
        <Composition
            id="MobileAppDemo"
            component={MobileAppScene}
            durationInFrames={DEMO_DURATION}
            fps={30}
            width={1920}
            height={1080}
            defaultProps={{}}
        />
    );
};
