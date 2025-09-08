import { Note } from '@/types/note';
import css from './NoteList.module.css';
import Link from 'next/link';

interface Props {
  notes: Note[];
}

export default function NoteList({ notes }: Props) {
  return (
    <div className={css.list}>
      {notes.map((note) => (
        <div key={note.id} className={css.card}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <p>{note.date}</p>
          <Link href={`/notes/${note.id}`}>View details</Link>
          <button>Delete</button>
        </div>
      ))}
    </div>
  );
}
