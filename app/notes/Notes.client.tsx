'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import css from './Notes.module.css';

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['notes', searchTerm],
    queryFn: () => fetchNotes({ search: searchTerm }),
    placeholderData: () => [],
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
  };

  return (
    <div className={css.container}>
      <h1>My Notes</h1>

      <SearchBox value={searchTerm} onChange={handleSearch} />

      <button className={css.toggleButton} onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close Form' : 'Add Note'}
      </button>

      {showForm && <NoteForm onSuccess={handleFormSuccess} />}

      {isLoading ? <p>Loading notes...</p> : <NoteList notes={data ?? []} />}
    </div>
  );
}
