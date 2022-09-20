import * as trpcNext from '@trpc/server/adapters/next';
import {appRouter} from '../backend/routers/appRouter';
import { createContext } from '../backend/context';

export default (trpcNext.createNextApiHandler({
    router: appRouter,
    createContext,
  }));
