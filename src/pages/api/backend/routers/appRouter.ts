
import  pokemonSearchRouter  from './pokemonSearchRouter';
import { createRouter } from "../context";


export const appRouter = createRouter()
  .merge('search.', pokemonSearchRouter);
  
// export type definition of API


export type AppRouter = typeof appRouter;