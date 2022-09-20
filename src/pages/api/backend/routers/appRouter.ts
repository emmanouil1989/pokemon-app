
import  pokemonSearchRouter  from './pokemonSearchRouter';
import { createRouter } from "../context";
import pokemonDetailsRouter from './pokemonDetailsRouter';


export const appRouter = createRouter()
  .merge('search.', pokemonSearchRouter)
  .merge('details.', pokemonDetailsRouter);
  
// export type definition of API


export type AppRouter = typeof appRouter;