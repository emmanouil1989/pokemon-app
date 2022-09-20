import { createRouter } from "../context";
import {prisma} from '../../../../../prisma/prisma';

const pokemonSearchRouter = createRouter().query('pokemon', {
    async resolve({ctx}) {
        const response = await prisma.pokemon.findMany();
       return {
        pokemons: response,
       };
     },
   })



export default pokemonSearchRouter;