import { useEffect, RefObject } from 'react';
export const useOutsideClick = (
    ref: RefObject<HTMLElement>,
    callback: (event: MouseEvent) => void
): void => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback(event); // Передаем событие в callback
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};
