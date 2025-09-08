import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';

// export default async function NoteDetailsPage({ params }: { params: { id: string } }) {
//   const queryClient = new QueryClient();
//   const noteId = Number(params.id);

//   await queryClient.prefetchQuery({
//     queryKey: ['note', noteId],
//     queryFn: () => fetchNoteById(noteId),
//   });

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <NoteDetailsClient id={noteId} />
//     </HydrationBoundary>
//   );
// }

export default async function NoteDetailsPage(props: any) {
  const { id } = props.params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', Number(id)],
    queryFn: () => fetchNoteById(Number(id)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={Number(id)} />
    </HydrationBoundary>
  );
}
