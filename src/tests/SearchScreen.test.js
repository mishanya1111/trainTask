import SearchScreen from '@components/SearchScreen';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

const mockOnSearch = jest.fn();

describe('SearchScreen component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly', () => {
        render(<SearchScreen onSearch={mockOnSearch} />);

        expect(
            screen.getByRole('heading', { name: /Let's Find Some Art/i })
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText('Search art author/title')
        ).toBeInTheDocument();
    });

    test('calls onSearch function when input is valid', async () => {
        jest.useFakeTimers();

        render(<SearchScreen onSearch={mockOnSearch} />);

        const input = screen.getByPlaceholderText('Search art author/title');

        userEvent.type(input, 'Valid query');

        jest.runAllTimers();

        await waitFor(() => {
            expect(mockOnSearch).toHaveBeenCalledWith('Valid query');
        });

        jest.useRealTimers();
    });

    test('does not call onSearch when query is invalid', async () => {
        render(<SearchScreen onSearch={mockOnSearch} />);

        const input = screen.getByPlaceholderText('Search art author/title');

        userEvent.type(input, 'ab');

        await waitFor(() => {
            expect(mockOnSearch).not.toHaveBeenCalled();
        });
    });
});
