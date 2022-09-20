import { createRouter } from "../context";
import { z } from "zod";

const pokemonDetailsRouter = createRouter().query("pokemon", {
  input: z.object({ pokemonId: z.string() }),
  async resolve({ ctx, input }) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${input.pokemonId}`
    );
    console.log("response", response);
    console.log(response.json());

    return {
      pokemons: response,
    };
  },
});

export default pokemonDetailsRouter;
