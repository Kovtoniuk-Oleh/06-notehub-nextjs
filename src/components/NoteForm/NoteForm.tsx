import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../services/noteService';
import toast from 'react-hot-toast';
import { Loading } from 'notiflix';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onSuccess: () => void;
}

const formTags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const;

interface NoteFormValues {
  title: string;
  content: string;
  tag: (typeof formTags)[number];
}

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(50).required('Title is required'),
  content: Yup.string().max(500),
  tag: Yup.string().oneOf(formTags).required('Tag is required'),
});

const initialValues: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

export default function NoteForm({ onSuccess }: NoteFormProps) {
  const queryClient = useQueryClient();

  const noteMutation = useMutation({
    mutationFn: async (values: NoteFormValues) => {
      return await createNote(values);
    },
    onSuccess: () => {
      toast.success('Note created successfully!');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      Loading.remove();
      onSuccess();
    },
    onError: () => {
      toast.error('Failed to create note');
      Loading.remove();
    },
  });

  const handleAction = (values: NoteFormValues, actions: FormikHelpers<NoteFormValues>) => {
    Loading.hourglass();
    noteMutation.mutate(values);
    actions.resetForm();
  };

  return (
    <Formik<NoteFormValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleAction}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field as="textarea" id="content" name="content" rows={8} className={css.textarea} />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field as="select" id="tag" name="tag" className={css.select}>
              {formTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button type="button" className={css.cancelButton} onClick={onSuccess}>
              Cancel
            </button>
            <button type="submit" className={css.submitButton} disabled={isSubmitting}>
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
