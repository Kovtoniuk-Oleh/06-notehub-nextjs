'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { Note } from '@/types/note';
import css from './details.module.css';

const NoteDetailsClient = () => {
  const { id } = useParams(); // беремо id з URL

  // Перевіряємо, що id точно є рядком
  if (!id || Array.isArray(id)) {
    return <p>Invalid note ID</p>;
  }

  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note, Error>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id), // тепер TS точно знає, що це string
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading note, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          {note.updatedAt
            ? `Updated: ${new Date(note.updatedAt).toLocaleString()}`
            : `Created: ${new Date(note.createdAt).toLocaleString()}`}
        </p>
        <p className={css.tag}>
          <strong>Tag:</strong> {note.tag}
        </p>
      </div>
    </div>
  );
};

export default NoteDetailsClient;
