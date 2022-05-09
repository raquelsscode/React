import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

describe('Teste do componente "<App.js"/>', () => {
  it('Testa se o topo da aplicação contém um conjunto fixo de links.', async () => {
    renderWithRouter(<App />);
    const homeEl = screen.getByRole('link', { name: 'Home' });
    const aboutEl = screen.getByRole('link', { name: 'About' });
    const favoritePokémonsEl = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(homeEl).toBeDefined();
    expect(homeEl).toHaveTextContent('Home');
    expect(aboutEl).toBeDefined();
    expect(aboutEl).toHaveTextContent('About');
    expect(favoritePokémonsEl).toBeDefined();
    expect(favoritePokémonsEl).toHaveTextContent('Favorite Pokémons');
  });
});
