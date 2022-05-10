import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

const text = 'Próximo pokémon';

describe('Testa do componente "<Pokedex.js"/>', () => {
  it('Teste se a página contém  o texto Encountered pokémons.', async () => {
    renderWithRouter(<App />);
    const title = 'Encountered pokémons';
    const titlePokemons = screen.getByRole('heading', { level: 2 });
    expect(titlePokemons).toBeInTheDocument();
    expect(titlePokemons).toHaveTextContent(title);
  });

  it('Testa se é exibido o próximo pokémon quando o botão é clicado.', async () => {
    renderWithRouter(<App />);
    const pokemons = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans',
      'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];

    // O botão deve conter o texto Próximo pokémon
    const buttonNext = screen.getByRole('button', { name: text });
    expect(buttonNext).toBeInTheDocument();
    expect(buttonNext).toHaveTextContent(text);

    // Os próximos pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;

    pokemons.forEach((pokemon) => {
      expect(screen.queryByText(pokemon)).toBeInTheDocument();
      userEvent.click(buttonNext);
    });

    // O primeiro pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último pokémon da lista;
    const count = 9;
    for (let index = 0; index < count; index += 1) {
      userEvent.click(buttonNext);
    }
    const firstPokemon = await screen.findByText('Pikachu');
    expect(firstPokemon).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um pokémon por vez.', async () => {
    renderWithRouter(<App />);
    const pokemons = ['Pikachu', 'Caterpie', 'Ekans',
      'Alakazam', 'Mew', 'Rapidash', 'Snorlax', 'Dragonair'];
    const buttonNext = screen.getByRole('button', { name: text });
    userEvent.click(buttonNext);
    const nextPokemon = await screen.findByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();
    pokemons.forEach((pokemon) => {
      expect(screen.queryByText(pokemon)).not.toBeInTheDocument();
    });
  });

  it('Teste se a Pokédex tem os botões de filtro.', async () => {
    renderWithRouter(<App />);
    // Deve existir um botão de filtragem para cada tipo de pokémon, sem repetição.
    const types = ['Electric', 'Fire', 'Bug',
      'Poison', 'Psychic', 'Normal', 'Dragon'];
    types.forEach((type, i) => {
      const buttonType = screen.getAllByTestId('pokemon-type-button');
      expect(buttonType[i]).toHaveTextContent(type);
      // O texto do botão deve corresponder ao nome do tipo, ex. Psychic
      const typePokemon = screen.getByTestId('pokemon-type');
      userEvent.click(buttonType[i]);
      expect(typePokemon).toHaveTextContent(type);
      // O botão All precisa estar sempre visível.
      const allButton = screen.getByRole('button', { name: 'All' });
      expect(allButton).toBeInTheDocument();
    });
    // A Pokedéx deverá mostrar os pokémons normalmente (sem filtros) quando o botão All for clicado;
    const allButton = screen.getByRole('button', { name: 'All' });
    userEvent.click(allButton);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const buttonNext = screen.getByRole('button', { name: text });
    userEvent.click(buttonNext);
    const charmander = await screen.findByText('Charmander');
    expect(charmander).toBeInTheDocument();
  });
});
