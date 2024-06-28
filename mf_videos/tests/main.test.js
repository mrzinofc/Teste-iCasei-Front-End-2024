// __tests__/main.test.js
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';
import { screen, render } from '@testing-library/react';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('mf_videos', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        require('../main'); // Necessário para reimportar o script após cada teste
    });

    test('renders search input and button', () => {
        const searchInput = screen.getByPlaceholderText('Search for videos');
        const searchButton = screen.getByText('Search');
        expect(searchInput).toBeInTheDocument();
        expect(searchButton).toBeInTheDocument();
    });

    test('performs search on button click', async () => {
        const searchInput = screen.getByPlaceholderText('Search for videos');
        const searchButton = screen.getByText('Search');

        fireEvent.input(searchInput, { target: { value: 'cats' } });
        fireEvent.click(searchButton);

        // Aqui você precisaria mockar a resposta da API do YouTube
        // Por exemplo, usando jest.mock()
        await screen.findByText('Resultados da busca');
        expect(screen.getByText('Resultados da busca')).toBeInTheDocument();
    });
});
