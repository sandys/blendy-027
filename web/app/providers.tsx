'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { useState, ReactNode } from 'react';
import { hoursToMilliseconds, minutesToMilliseconds } from 'date-fns';
import StoreProvider from './StoreProvider';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: hoursToMilliseconds(24),
        staleTime: minutesToMilliseconds(5),
      },
    },
  }));

  const [persister] = useState(() => {
    if (typeof window !== 'undefined') {
        return createSyncStoragePersister({
            storage: window.localStorage,
            key: 'REACT_QUERY_CACHE_V4',
        });
    }
    return undefined;
  });

  return (
    <StoreProvider>
      {persister ? (
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister, buster: 'v3' }}
        >
          {children}
        </PersistQueryClientProvider>
      ) : (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )}
    </StoreProvider>
  );
}
