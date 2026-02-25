import { registerRoot } from 'remotion';
import './style.css';

import { MobileAppDemo, DashboardDemo } from './templates';

export const RemotionRoot: React.FC = () => {
    return (
        <>
            <MobileAppDemo />
            <DashboardDemo />
        </>
    );
};

registerRoot(RemotionRoot);
