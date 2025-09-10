import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '@/lib/api';

export default async function NotePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const queryClient = new QueryClient();

  // Prefetch нотатки на сервері
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
}
