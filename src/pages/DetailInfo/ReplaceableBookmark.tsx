import bookmarkRemove from '@assets/img/unbookmark.png';
import bookmarkAdd from '@assets/img/bookmark.png';
import React from 'react';

export default function ReplaceableBookmark({
    isFavorited
}: {
    isFavorited: boolean;
}): JSX.Element {
    return (
        <img
            src={isFavorited ? bookmarkRemove : bookmarkAdd}
            alt={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        />
    );
}
