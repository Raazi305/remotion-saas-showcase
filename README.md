# 🎬 Remotion SaaS Showcase

**[繁體中文](./README.zh-TW.md)** | English

Build stunning product showcase videos with code. A Remotion toolkit featuring realistic device frames, animated cursors, and ready-to-use templates.

> Create professional SaaS demo videos in minutes — no After Effects, no Figma exports. Just React.

## ✨ Features

| Component      | Description                                                       |
| -------------- | ----------------------------------------------------------------- |
| `PhoneFrame`   | iPhone frame with Dynamic Island, status bar, and home indicator  |
| `BrowserFrame` | macOS browser chrome with traffic lights and URL bar              |
| `Cursor`       | Smooth arrow and pointer hand cursor with click animations        |
| `BaseButton`   | Multi-variant button (primary, secondary, danger, ghost, outline) |
| `BaseInput`    | Form input with labels, errors, and helper text                   |
| `NumberTicker` | Animated number counter with easing                               |
| `TextOverlay`  | Spring-animated text overlay with alignment options               |
| `Indicator`    | Visual focus indicator (box, circle, pointer) with pulsing        |

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Preview in browser
pnpm start

# Render to MP4
pnpm build MobileAppDemo   # Mobile sign-up → dashboard flow
pnpm build DashboardDemo   # Desktop admin dashboard
```

## 📂 Project Structure

```text
src/
├── components/     # Core reusable components
│   ├── PhoneFrame.tsx
│   ├── BrowserFrame.tsx
│   ├── Cursor.tsx
│   ├── BaseButton.tsx
│   ├── BaseInput.tsx
│   ├── NumberTicker.tsx
│   ├── TextOverlay.tsx
│   ├── Indicator.tsx
│   └── index.ts
├── templates/      # Ready-to-use showcase templates
│   ├── MobileAppDemo.tsx    # 📱 Mobile app sign-up + dashboard
│   └── DashboardDemo.tsx    # 🖥️ Desktop admin with charts
├── app.tsx         # Remotion entry point
└── style.css       # Tailwind CSS 4 theme
```

## 🎯 Templates

### 📱 Mobile App Demo
A complete mobile app showcase featuring:
- Animated sign-up form with cursor typing
- Success modal with spring animation
- Dashboard transition with stats cards

### 🖥️ Dashboard Demo
A desktop admin panel showcase featuring:
- Sidebar navigation with page transitions
- Animated bar chart and number tickers
- Data table with status badges

## 🛠️ Tech Stack

- **[Remotion](https://remotion.dev)** — React-based video creation
- **[Tailwind CSS 4](https://tailwindcss.com)** — Utility-first styling
- **TypeScript** — Type safety
- **React 18** — UI framework

## 📖 Documentation

- [Scripting Guide](./docs/scripting-guide.md) — How to plan, script, and produce showcase videos (voiceover workflow, timing, checklists)

## 📝 Usage

### Import Components

```tsx
import { PhoneFrame, Cursor, BaseButton } from './components';

const MyScene: React.FC = () => {
    const frame = useCurrentFrame();
    
    return (
        <AbsoluteFill>
            <PhoneFrame>
                <div className="p-6">
                    <h1>My App</h1>
                    <BaseButton variant="primary">Get Started</BaseButton>
                </div>
            </PhoneFrame>
            <Cursor x={200} y={300} isClicking={frame >= 60} />
        </AbsoluteFill>
    );
};
```

### Register a Composition

```tsx
import { Composition } from 'remotion';

export const MyShowcase: React.FC = () => (
    <Composition
        id="MyShowcase"
        component={MyScene}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
    />
);
```

## 📜 License

MIT

## 🙌 Credits

Built with ❤️ using [Remotion](https://remotion.dev).
