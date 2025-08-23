import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { fetchNotes } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import NoteForm from '../NoteForm/NoteForm';
import Modal from '../Modal/Modal';
import SearchBox from '../SearchBox/SearchBox';
import css from './App.module.css';
import type { FetchNotesResponse } from '../../services/noteService';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    setPage(1); // Скидаємо сторінку при зміні пошуку
  }, [debouncedSearchTerm]);

  const { data, isLoading } = useQuery<FetchNotesResponse, Error, FetchNotesResponse>({
    queryKey: ['notes', page, debouncedSearchTerm],
    queryFn: () => fetchNotes({ page, search: debouncedSearchTerm }),
    placeholderData: () => ({ notes: [], totalPages: 1 }),
  });

  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      {/* 🔹 Верхній рядок: пошук + пагінація + кнопка */}
      <div className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={(value) => setSearchTerm(value)} />

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
            className={css.inlinePagination}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </div>

      {/* 🔹 Модальне вікно */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onSuccess={() => setIsModalOpen(false)} />
        </Modal>
      )}

      {/* 🔹 Список нотаток */}
      {isLoading ? (
        <p>Завантаження...</p>
      ) : (
        <NoteList notes={data?.notes ?? []} page={page} search={debouncedSearchTerm} />
      )}
    </div>
  );
};

export default App;
