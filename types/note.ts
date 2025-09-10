export type NoteTag = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo' | undefined;

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  totalNotes?: number; // необов'язково, можна додати для статистики
}
