import { createRouter } from "../context";
import { prisma } from "../../../../../prisma/prisma";
import { z } from "zod";
const pokemonSearchRouter = createRouter().query("pokemon", {
  input: z.object({ search: z.string().optional() }),
  async resolve({ ctx, input }) {
    try {
      const response = await prisma.pokemon.findMany({
        where: {
          name: {
            contains: input.search,
          },
        },
      });
      return {
        pokemons: response,
      };
    } catch (e) {
      console.log(e);
    }
  },
});

export default pokemonSearchRouter;
