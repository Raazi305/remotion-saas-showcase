# 🎬 Remotion SaaS Showcase

繁體中文 | **[English](./README.md)**

用程式碼打造精美的產品展示影片。一套 Remotion 工具包，內含擬真裝置外框、動畫游標，以及即用型模板。

> 幾分鐘內就能製作專業的 SaaS 展示影片 — 不需要 After Effects，不需要匯出 Figma。只要 React。

## ✨ 功能特色

| 元件           | 說明                                                     |
| -------------- | -------------------------------------------------------- |
| `PhoneFrame`   | iPhone 外框，含動態島、狀態列與 Home Indicator           |
| `BrowserFrame` | macOS 瀏覽器外框，含紅綠燈按鈕與網址列                   |
| `Cursor`       | 平滑的箭頭與手指游標，附帶點擊動畫                       |
| `BaseButton`   | 多樣式按鈕（primary、secondary、danger、ghost、outline） |
| `BaseInput`    | 表單輸入框，支援標籤、錯誤訊息與提示文字                 |
| `NumberTicker` | 帶有緩動效果的數字動畫計數器                             |
| `TextOverlay`  | 彈簧動畫文字疊層，支援對齊設定                           |
| `Indicator`    | 視覺聚焦指示器（方框、圓形、指標），支援脈衝效果         |

## 🚀 快速開始

```bash
# 安裝依賴
pnpm install

# 在瀏覽器中預覽
pnpm start

# 輸出為 MP4
pnpm build MobileAppDemo   # 行動裝置 註冊 → 儀表板 流程
pnpm build DashboardDemo   # 桌面版管理後台
```

## 📂 專案結構

```text
src/
├── components/     # 核心可重用元件
│   ├── PhoneFrame.tsx
│   ├── BrowserFrame.tsx
│   ├── Cursor.tsx
│   ├── BaseButton.tsx
│   ├── BaseInput.tsx
│   ├── NumberTicker.tsx
│   ├── TextOverlay.tsx
│   ├── Indicator.tsx
│   └── index.ts
├── templates/      # 即用型展示模板
│   ├── MobileAppDemo.tsx    # 📱 行動裝置 App 註冊 + 儀表板
│   └── DashboardDemo.tsx    # 🖥️ 桌面版管理後台含圖表
├── app.tsx         # Remotion 進入點
└── style.css       # Tailwind CSS 4 主題
```

## 🎯 模板

### 📱 行動裝置 App 展示
完整的行動裝置 App 展示，包含：
- 帶有游標打字動畫的註冊表單
- 彈簧動畫的成功彈窗
- 帶有統計卡片的儀表板轉場

### 🖥️ 管理後台展示
桌面版管理面板展示，包含：
- 側邊欄導航與頁面轉場
- 動畫長條圖與數字滾動器
- 含有狀態標籤的資料表格

## 🛠️ 技術棧

- **[Remotion](https://remotion.dev)** — 基於 React 的影片製作框架
- **[Tailwind CSS 4](https://tailwindcss.com)** — 原子化 CSS 框架
- **TypeScript** — 型別安全
- **React 18** — UI 框架

## 📖 文件

- [腳本規劃指南](./docs/scripting-guide.zh-TW.md) — 如何規劃、撰寫與製作展示影片（配音流程、節奏、檢查清單）

## 📝 使用方式

### 匯入元件

```tsx
import { PhoneFrame, Cursor, BaseButton } from './components';

const MyScene: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <AbsoluteFill>
            <PhoneFrame>
                <div className="p-6">
                    <h1>My App</h1>
                    <BaseButton variant="primary">開始使用</BaseButton>
                </div>
            </PhoneFrame>
            <Cursor x={200} y={300} isClicking={frame >= 60} />
        </AbsoluteFill>
    );
};
```

### 註冊 Composition

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

## 📜 授權

MIT

## 🙌 致謝

使用 [Remotion](https://remotion.dev) 以 ❤️ 打造。
