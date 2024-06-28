// __tests__/main.test.js
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';
import { screen, render } from '@testing-library/react';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('mf_drawer', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        require('../main'); // Necessário para reimportar o script após cada teste
    });

    test('renders navigation links', () => {
        const videosLink = screen.getByText('VÍDEOS');
        const favoritesLink = screen.getByText('FAVORITOS');
        expect(videosLink).toBeInTheDocument();
        expect(favoritesLink).toBeInTheDocument();
    });

    test('navigates to videos section on click', () => {
        const videosLink = screen.getByText('VÍDEOS');
        fireEvent.click(videosLink);
        expect(window.location.hash).toBe('#videos');
    });

    test('navigates to favorites section on click', () => {
        const favoritesLink = screen.getByText('FAVORITOS');
        fireEvent.click(favoritesLink);
        expect(window.location.hash).toBe('#favorites');
    });
});
