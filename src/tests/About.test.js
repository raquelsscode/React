import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { About } from '../components';
import renderWithRouter from '../RenderWithRouter';

describe('Teste do componente "<About.js"/>', () => {
  it('Testa se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('About Pokédex');
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', async () => {
    renderWithRouter(<About />);
    const textone = 'This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons';
    const texttwo = 'One can filter Pokémons by type,'
    + ' and see more details for each one of them';
    const paragrafos = screen.getByText(textone);
    expect(paragrafos).toBeInTheDocument();
    const paragrafo = screen.getByText(texttwo);
    expect(paragrafo).toBeInTheDocument();
  });

  it('Testa se a página contém a seguinte imagem de uma Pokédex.', async () => {
    renderWithRouter(<About />);
    const linkImage = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img', { name: 'Pokédex' });
    expect(image).toHaveAttribute(
      'src', linkImage,
    );
  });
});
