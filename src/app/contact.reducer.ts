import { createReducer, on } from '@ngrx/store';
import { Contact } from './contact.model';
import { loadContactsSuccess, addContactSuccess, editContactSuccess, deleteContactSuccess } from './contact.actions';

export const initialState: Contact[] = [];

export const contactReducer = createReducer(
  initialState,
  on(loadContactsSuccess, (_, { contacts }) => contacts),
  on(addContactSuccess, (state, { contact }) => [...state, contact]),
  on(editContactSuccess, (state, { contact }) =>
    state.map(c => (c.id === contact.id ? contact : c))
  ),
  on(deleteContactSuccess, (state, { id }) => state.filter(c => c.id !== id))
);
