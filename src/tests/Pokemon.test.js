import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

const details = 'More details';

describe('Teste do componente "<Pokemon.js"/>', () => {
  it('Teste se é renderizado um card com as infos de determinado pokémon.', async () => {
    renderWithRouter(<App />);
    const pokemon = [{
      name: 'Pikachu',
      type: 'Electric',
      weight: '6.0 kg',
      image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    }];

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(pokemon),
    }));
    // O nome correto do pokémon deve ser mostrado na tela;
    const pokemonName = screen.getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();
    // O tipo correto do pokémon deve ser mostrado na tela;
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    // O peso médio do pokémon deve ser exibido com um texto no formato
    // Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são,
    // respectivamente, o peso médio do pokémon e sua unidade de medida.
    const weightPokemon = screen.getByText('Average weight: 6.0 kg');
    expect(weightPokemon).toBeInTheDocument();

    // A imagem do pokémon deve ser exibida. Ela deve conter um atributo src com a URL
    // da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon;
    const imagePokemon = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const image = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(image).toHaveAttribute(
      'src', imagePokemon,
    );
  });
  it('Testa se o card do pokémon tem um link de navegação para exibir detalhes', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: details });
    expect(linkDetails).toHaveAttribute('href', '/pokemons/25');
  });

  //   Teste se ao clicar no link de navegação do pokémon, é feito o redirecionamento da aplicação para a página de detalhes de pokémon.
  it('Testa se clicar no link de navegação, é feito o redirecionamento', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: details });
    userEvent.click(linkDetails);
    const titleDetails = screen.getByText('Pikachu Details');
    expect(titleDetails).toBeInTheDocument();
  });

  // Teste também se a URL exibida no navegador muda para /pokemon/<id>,
  // onde <id> é o id do pokémon cujos detalhes se deseja ver;
  it('Testa se clicar no link de navegação, a URL exibida no navegador muda', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/pokemons/25');

    const titleDetails = screen.getByText('Pikachu Details');
    expect(titleDetails).toBeInTheDocument();
  });

  // Teste se existe um ícone de estrela nos pokémons favoritados.
  it('Teste se existe um ícone de estrela nos pokémons favoritados.', async () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: details });
    userEvent.click(linkDetails);
    const check = await screen.findByRole('checkbox');
    userEvent.click(check);
    const imageStar = 'Pikachu is marked as favorite';
    const star = screen.getByRole('img', { name: imageStar });
    expect(star).toHaveAttribute(
      'src', '/star-icon.svg',
    );
  });
});
