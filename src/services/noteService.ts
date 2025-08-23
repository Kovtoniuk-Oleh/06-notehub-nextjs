import axios from 'axios';
import type { Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api/notes';
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const headers = {
  Authorization: `Bearer ${token}`,
};

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// export const fetchNotes = async (params: FetchNotesParams): Promise<FetchNotesResponse> => {
//   const response = await axios.get(BASE_URL, { params, headers });
//   return response.data;
// };

export const fetchNotes = async (params: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await axios.get(BASE_URL, { params, headers });
  const { notes, totalPages } = response.data;
  return {
    notes,
    totalPages,
  };
};

// export const createNote = async (note: Omit<Note, 'id'>): Promise<Note> => {
export const createNote = async (note: Pick<Note, 'title' | 'content' | 'tag'>): Promise<Note> => {
  const response = await axios.post(BASE_URL, note, { headers });
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axios.delete(`${BASE_URL}/${id}`, { headers });
  return response.data;
};
