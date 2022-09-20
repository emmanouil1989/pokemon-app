import { createRouter } from "../context";
import { z } from "zod";
import { PokemonClient, Stat } from "pokenode-ts";
import { prisma } from "../../../../../prisma/prisma";

const pokemonDetailsRouter = createRouter().query("pokemon", {
  input: z.object({ pokemonId: z.string() }),
  async resolve({ ctx, input }) {
    try {
      const storedPokemon = await prisma.pokemon.findUnique({
        where: {
          pokemonId: input.pokemonId,
        },
      });
      const pokemonClient = new PokemonClient();
      const pokemon = await pokemonClient.getPokemonById(
        parseInt(input.pokemonId)
      );

      const stats = await Promise.all(
        pokemon.stats.map(async (_, index) => {
          const stat = await pokemonClient.getStatById(index + 1);

          const increaseMoveNames = stat.affecting_moves.increase

            .map((pokemonMove) => pokemonMove.move.name)
            .filter((_, index) => index < 3);
          return {
            name: stat.name,
            increaseMoveNames,
          };
        })
      );

      const abilities = await Promise.all(
        pokemon.abilities.map(async (_, index) => {
          const ability = await pokemonClient.getAbilityById(index + 1);
          return {
            name: ability.name,
          };
        })
      );

      const types = pokemon.types.map((pokemonType) => {
        return pokemonType.type.name;
      });
      return {
        name: pokemon.name,
        weight: pokemon.weight,
        height: pokemon.height,
        stats: stats.flat(Infinity),
        abilities,
        types: types,
        imageUrl: storedPokemon!.spriteUrl,
      } as PokemonDetailsType;
    } catch (e) {
      console.log(e);
    }
  },
});

export type PokemonDetailsType = {
  name: string;
  weight: number;
  height: number;
  stats: Array<{
    name: string;
    increaseMoveNames: Array<string>;
  }>;
  abilities: Array<{
    name: string;
  }>;
  types: Array<string>;
  imageUrl: string;
};

export default pokemonDetailsRouter;
