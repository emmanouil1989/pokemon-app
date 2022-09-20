import { Prisma, PrismaClient } from "@prisma/client";
import { PokemonClient } from "pokenode-ts";

const pokemonClient = new PokemonClient();
const prisma = new PrismaClient();

export const fillDB = async () => {
  const pokemonList = await pokemonClient.listPokemons(0, 100);

  try {
    console.log("response data");
    console.log(pokemonList);

    const formattedPokemon = pokemonList.results.map((p, index) => ({
      name: (p as { name: string }).name,
      spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        index + 1
      }.png`,
    }));

    const response = await prisma.pokemon.createMany({
      data: formattedPokemon,
    });
    console.log("response"), response;
  } catch (e) {
    console.log(e, "error");
  }
};

fillDB();
