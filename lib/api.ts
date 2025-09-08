import axios from 'axios';
import { Note } from '@/types/note';

const BASE_URL = 'https://notehub-app-api.vercel.app/api/notes';
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export async function fetchNotes(params?: { search?: string }): Promise<Note[]> {
  const response = await axios.get<Note[]>(BASE_URL, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    params, // <-- автоматично додає ?search=... до URL
  });
  return response.data;
}

export async function fetchNoteById(id: number): Promise<Note> {
  const response = await axios.get<Note>(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return response.data;
}

export async function createNote(noteData: { title: string; content: string; tag: string }): Promise<Note> {
  const response = await axios.post<Note>(BASE_URL, noteData, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
  return response.data;
}
