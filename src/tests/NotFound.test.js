import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import App from '../App';
import { NotFound } from '../components';
import renderWithRouter from '../RenderWithRouter';

describe('Teste do componente "<NotFound.js"/>', () => {
  it('Testa se a página contém o texto Page requested not found 😭.', async () => {
    renderWithRouter(<NotFound />);
    const notFoundMsg = 'Page requested not found 😭';
    const titleNotFound = screen.getByRole('heading', { level: 2 });
    // const aboutEl = screen.getByRole('link', { name: 'About' });
    // const favoritePokémonsEl = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(titleNotFound).toBeDefined();
    expect(titleNotFound).toHaveTextContent(notFoundMsg);
    const linkImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen
      .getByRole('img',
        { name: 'Pikachu crying because the page requested was not found' });
    expect(image).toHaveAttribute(
      'src', linkImage,
    );
    // expect(aboutEl).toBeDefined();
    // expect(aboutEl).toHaveTextContent('About');
    // expect(favoritePokémonsEl).toBeDefined();
    // expect(favoritePokémonsEl).toHaveTextContent('Favorite Pokémons');
  });
});
