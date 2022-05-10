import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

describe('Teste do componente "<FavoritePokemons.js"/>', () => {
  it('Testa se é exibida uma mensagem, caso não tenha pokémons favoritos.', () => {
    const errorMsg = 'No favorite pokemon found';
    renderWithRouter(<FavoritePokemons />);

    const notFound = screen.getByText(errorMsg);
    expect(notFound).toBeInTheDocument();
  });

  it('Teste se são exibidos todos os cards de pokémons favoritados.', async () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /More details/i });
    userEvent.click(details);
    const title = await screen.findByRole('checkbox');
    expect(title).toBeInTheDocument();
    userEvent.click(title);
    const favoritePokémonsEl = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoritePokémonsEl).toBeInTheDocument();
    userEvent.click(favoritePokémonsEl);
    const teste = await screen.findByText('Pikachu');
    expect(teste).toBeInTheDocument();
  });
});
