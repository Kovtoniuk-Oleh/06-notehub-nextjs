import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // Якщо хочеш передати пошуковий термін — заміни '' на реальний searchTerm
  await queryClient.prefetchQuery({
    queryKey: ['notes', ''], // <-- другий елемент — це searchTerm
    queryFn: ({ queryKey }) => fetchNotes({ search: queryKey[1] }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
