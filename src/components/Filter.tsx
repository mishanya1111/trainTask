import { useArtworksContext } from '@utils/ArtworksContext';
import React from 'react';

const Filter: React.FC = () => {
    const { sortCriterion, setSortCriterion } = useArtworksContext();

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortCriterion(e.target.value);
    };

    return (
        <div className="filter-container">
            <div></div>
            <div></div>
            <div>
                <h4>Here some more</h4>
                <h2>Other works for you</h2>
            </div>
            <div>
                <label htmlFor="sort-select">Filter: </label>
                <select
                    id="sort-select"
                    value={sortCriterion}
                    onChange={handleSortChange}
                >
                    <option value="name">By Name</option>
                    <option value="author">By Author</option>
                    <option value="year">By Year</option>
                    <option value="availability">By Availability</option>
                </select>
            </div>
        </div>
    );
};

export default Filter;
