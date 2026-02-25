// DashboardDemo - Template showcasing a desktop admin dashboard
import React from 'react';
import { Composition } from 'remotion';
import { useCurrentFrame, interpolate, spring, useVideoConfig, AbsoluteFill } from 'remotion';
import { BrowserFrame, Cursor, AnimatedNumber } from '../components';

// ---------------------------------------------------------------------------
// Demo Scene: Admin dashboard with animated stats and cursor interactions
// ---------------------------------------------------------------------------

const DEMO_DURATION = 300; // 10 seconds @ 30fps

const DashboardScene: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // --- Timeline ---
    // Phase 1: Title (0-50)    → Title enters with spring, exits with slide-up
    // Phase 2: Browser (45-80) → Browser springs in after title exits
    // Phase 3: Stats (80-140)  → Numbers animate, chart bars grow
    // Phase 4: Navigate (140-180) → Cursor moves to sidebar, clicks Orders
    // Phase 5: Orders (180-270) → Page crossfades to orders table
    // Phase 6: Outro (270-300) → Scale down + fade

    // ── Phase 1: Title ──────────────────────────────────────────────────
    const titleSpring = spring({ frame, fps, config: { damping: 14, mass: 0.8 }, durationInFrames: 25 });
    const subtitleSpring = spring({ frame: Math.max(0, frame - 10), fps, config: { damping: 14 }, durationInFrames: 25 });
    const titleExit = interpolate(frame, [38, 52], [1, 0], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    });
    const titleExitY = interpolate(frame, [38, 52], [0, -50], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    });

    // ── Phase 2: Browser entrance ───────────────────────────────────────
    const browserSpring = spring({
        frame: Math.max(0, frame - 48),
        fps,
        config: { damping: 16, mass: 1.0 },
        durationInFrames: 30,
    });
    const browserScale = interpolate(browserSpring, [0, 1], [0.88, 1]);

    // ── Phase 4: Cursor ─────────────────────────────────────────────────
    const cursorX = interpolate(
        frame,
        [90, 110, 155, 168],
        [700, 700, 90, 90],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
    );
    const cursorY = interpolate(
        frame,
        [90, 110, 155, 168],
        [300, 300, 190, 190],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
    );
    const isClicking = (frame >= 168 && frame <= 173);
    const cursorOpacity = interpolate(frame, [85, 95, 220, 230], [0, 1, 1, 0], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    });

    // ── Phase 5: Page switch ────────────────────────────────────────────
    const showSecondPage = frame >= 176;
    const ordersSpring = showSecondPage ? spring({
        frame: frame - 176,
        fps,
        config: { damping: 18, mass: 0.8 },
        durationInFrames: 20,
    }) : 0;

    // ── Phase 6: Outro ──────────────────────────────────────────────────
    const fadeOut = interpolate(frame, [272, 298], [1, 0], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    });
    const outroScale = interpolate(frame, [272, 298], [1, 0.96], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    });

    const sidebarItems = [
        { icon: '📊', label: 'Dashboard', active: !showSecondPage },
        { icon: '👥', label: 'Users', active: false },
        { icon: '📦', label: 'Orders', active: showSecondPage },
        { icon: '⚙️', label: 'Settings', active: false },
    ];

    return (
        <AbsoluteFill style={{ opacity: fadeOut, transform: `scale(${outroScale})` }}>
            {/* Background */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse at top, #1a1a3e 0%, #0f0f23 100%)',
                }}
            />
            {/* Subtle ambient glow */}
            <div
                className="absolute rounded-full"
                style={{
                    width: 800,
                    height: 800,
                    top: '10%',
                    left: '30%',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
                    transform: `scale(${1 + Math.sin(frame * 0.015) * 0.08})`,
                }}
            />

            {/* Title Card - exits BEFORE browser enters */}
            {frame < 60 && (
                <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                        opacity: titleExit,
                        transform: `translateY(${titleExitY}px)`,
                    }}
                >
                    <div className="text-center">
                        <h1
                            className="text-7xl font-extrabold text-white tracking-tight drop-shadow-lg"
                            style={{
                                opacity: titleSpring,
                                transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`,
                            }}
                        >
                            🖥️ Admin Dashboard
                        </h1>
                        <p
                            className="text-2xl text-white/50 mt-5 font-light tracking-widest uppercase"
                            style={{
                                opacity: subtitleSpring,
                                transform: `translateY(${interpolate(subtitleSpring, [0, 1], [25, 0])}px)`,
                            }}
                        >
                            Real-time analytics at a glance
                        </p>
                    </div>
                </div>
            )}

            {/* Browser Frame */}
            <div
                className="absolute"
                style={{
                    top: 60,
                    left: 160,
                    width: 1600,
                    height: 900,
                    transform: `scale(${browserScale})`,
                    opacity: browserSpring,
                }}
            >
                <BrowserFrame url="admin.myapp.com/dashboard" className="h-full" style={{ height: '100%' }}>
                    <div className="flex h-full">
                        {/* Sidebar */}
                        <div className="w-56 bg-gray-900 text-white p-4 shrink-0">
                            <div className="flex items-center gap-2 mb-8 px-2">
                                <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-sm font-bold">M</div>
                                <span className="font-bold text-lg">MyApp</span>
                            </div>
                            {sidebarItems.map((item) => (
                                <div
                                    key={item.label}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm transition-colors ${item.active
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-gray-400'
                                        }`}
                                >
                                    <span>{item.icon}</span>
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 bg-gray-50 p-6 overflow-hidden relative">
                            {/* Dashboard Page */}
                            <div
                                style={{
                                    opacity: showSecondPage ? 0 : 1,
                                    position: showSecondPage ? 'absolute' : 'relative',
                                    inset: showSecondPage ? 0 : undefined,
                                    padding: showSecondPage ? 24 : 0,
                                }}
                            >
                                <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>

                                {/* Stats Grid - staggered entrance */}
                                <div className="grid grid-cols-4 gap-4 mb-6">
                                    {[
                                        { label: 'Total Revenue', value: 48250, prefix: '$', color: 'text-green-600', bg: 'bg-green-50' },
                                        { label: 'Active Users', value: 2847, prefix: '', color: 'text-blue-600', bg: 'bg-blue-50' },
                                        { label: 'Orders Today', value: 156, prefix: '', color: 'text-purple-600', bg: 'bg-purple-50' },
                                        { label: 'Conversion', value: 12, prefix: '', suffix: '%', color: 'text-orange-600', bg: 'bg-orange-50' },
                                    ].map((stat, i) => {
                                        const cardSpring = spring({
                                            frame: Math.max(0, frame - 65 - i * 5),
                                            fps,
                                            config: { damping: 14 },
                                        });
                                        return (
                                            <div
                                                key={stat.label}
                                                className={`${stat.bg} rounded-xl p-4`}
                                                style={{
                                                    opacity: cardSpring,
                                                    transform: `translateY(${interpolate(cardSpring, [0, 1], [20, 0])}px)`,
                                                }}
                                            >
                                                <p className="text-sm text-gray-500">{stat.label}</p>
                                                <p className={`text-2xl font-bold ${stat.color} mt-1`}>
                                                    {stat.prefix}
                                                    <AnimatedNumber value={stat.value} startFrame={70} duration={50} />
                                                    {(stat as any).suffix || ''}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Chart */}
                                <div
                                    className="bg-white rounded-xl p-6 shadow-sm"
                                    style={{
                                        opacity: spring({ frame: Math.max(0, frame - 90), fps, config: { damping: 18 } }),
                                    }}
                                >
                                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h2>
                                    <div className="flex items-end gap-2 h-40">
                                        {[40, 65, 50, 80, 60, 90, 70, 95, 85, 100, 75, 110].map((h, i) => {
                                            const barSpring = spring({
                                                frame: Math.max(0, frame - 95 - i * 2),
                                                fps,
                                                config: { damping: 12, mass: 0.5 },
                                            });
                                            return (
                                                <div
                                                    key={i}
                                                    className="flex-1 bg-indigo-500 rounded-t"
                                                    style={{ height: `${h * barSpring}%` }}
                                                />
                                            );
                                        })}
                                    </div>
                                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                                            <span key={m}>{m}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Orders Page - slides in from right */}
                            {showSecondPage && (
                                <div
                                    style={{
                                        opacity: ordersSpring,
                                        transform: `translateX(${interpolate(ordersSpring, [0, 1], [30, 0])}px)`,
                                    }}
                                >
                                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Recent Orders</h1>
                                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                        <table className="w-full">
                                            <thead className="bg-gray-50 border-b">
                                                <tr>
                                                    {['Order ID', 'Customer', 'Amount', 'Status'].map((h) => (
                                                        <th key={h} className="text-left p-4 text-sm font-medium text-gray-500">{h}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {[
                                                    { id: '#1234', customer: 'Alice Chen', amount: '$129.00', status: 'Completed', color: 'bg-green-100 text-green-700' },
                                                    { id: '#1235', customer: 'Bob Wang', amount: '$89.50', status: 'Processing', color: 'bg-blue-100 text-blue-700' },
                                                    { id: '#1236', customer: 'Carol Liu', amount: '$245.00', status: 'Completed', color: 'bg-green-100 text-green-700' },
                                                    { id: '#1237', customer: 'David Lin', amount: '$67.00', status: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
                                                    { id: '#1238', customer: 'Eva Huang', amount: '$312.00', status: 'Completed', color: 'bg-green-100 text-green-700' },
                                                ].map((order, i) => {
                                                    const rowSpring = spring({
                                                        frame: Math.max(0, frame - 180 - i * 3),
                                                        fps,
                                                        config: { damping: 16 },
                                                    });
                                                    return (
                                                        <tr
                                                            key={order.id}
                                                            className="border-b last:border-0"
                                                            style={{
                                                                opacity: rowSpring,
                                                                transform: `translateY(${interpolate(rowSpring, [0, 1], [8, 0])}px)`,
                                                            }}
                                                        >
                                                            <td className="p-4 text-sm font-mono text-gray-900">{order.id}</td>
                                                            <td className="p-4 text-sm text-gray-700">{order.customer}</td>
                                                            <td className="p-4 text-sm font-semibold text-gray-900">{order.amount}</td>
                                                            <td className="p-4">
                                                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${order.color}`}>
                                                                    {order.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Cursor */}
                    <Cursor x={cursorX} y={cursorY} isClicking={isClicking} isPointer={frame >= 145} opacity={cursorOpacity} />
                </BrowserFrame>
            </div>
        </AbsoluteFill>
    );
};

// ---------------------------------------------------------------------------
// Composition Registration
// ---------------------------------------------------------------------------
export const DashboardDemo: React.FC = () => {
    return (
        <Composition
            id="DashboardDemo"
            component={DashboardScene}
            durationInFrames={DEMO_DURATION}
            fps={30}
            width={1920}
            height={1080}
            defaultProps={{}}
        />
    );
};
