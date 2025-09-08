'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Image from 'next/image'; // 👈 додаємо імпорт
import css from './NoteDetails.module.css';

interface Props {
  id: number;
}

export default function NoteDetailsClient({ id }: Props) {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        {/* 👇 Картинка логотипу */}
        <div className={css.logo}>
          <Image
            src="/images/notehub-logo.png" // 👈 шлях до картинки
            alt="NoteHub Logo"
            width={120}
            height={120}
          />
        </div>

        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.date}</p>
      </div>
    </div>
  );
}
