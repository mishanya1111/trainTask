import { RefObject, useEffect } from 'react';
export const useOutsideClick = (
    ref: RefObject<HTMLElement>,
    callback: (event: MouseEvent) => void
): void => {
    const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            callback(event);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};
