import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '../pages/api/backend/routers/appRouter';

export const trpc = createReactQueryHooks<AppRouter>();