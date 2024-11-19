import { useCallback, useEffect, useState } from 'react';

export function useWindowWidth(): number {
    const [windowWidth, setWindowWidth] = useState<number>(
        typeof window !== 'undefined' ? window.innerWidth : 0
    );

    const handleResize = useCallback(() => {
        setWindowWidth(window.innerWidth);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    return windowWidth;
}
