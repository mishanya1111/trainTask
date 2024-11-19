import SearchScreen from '@components/SearchScreen'; // путь к компоненту
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

// Мокаем onSearch функцию
const mockOnSearch = jest.fn();

describe('SearchScreen component', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // очищаем мок функции перед каждым тестом
    });

    test('renders correctly', () => {
        render(<SearchScreen onSearch={mockOnSearch} />);

        // Ищем элемент по роли
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

        // Симулируем прохождение времени для дебаунса
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

        // Ожидаем, что onSearch не будет вызвана
        await waitFor(() => {
            expect(mockOnSearch).not.toHaveBeenCalled();
        });
    });
});
