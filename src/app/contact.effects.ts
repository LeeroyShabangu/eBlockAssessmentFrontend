import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ContactService } from './contact.service';
import { loadContacts, loadContactsSuccess, addContact, addContactSuccess, editContact, editContactSuccess, deleteContact, deleteContactSuccess, loadContactsFailure } from './contact.actions';

@Injectable()
export class ContactEffects {

  loadContacts$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadContacts),
    mergeMap(() =>
      this.contactService.getContacts().pipe(
        map(contacts => loadContactsSuccess({ contacts })),
        catchError(error => of(loadContactsFailure({ error })))
      )
    )
  )
);

  createContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addContact),
      mergeMap(action =>
        this.contactService.createContact(action.contact).pipe(
          map(() => addContactSuccess({ contact: action.contact })),
          catchError(() => of({ type: 'Create Contact Error' }))
        )
      )
    )
  );

  updateContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editContact),
      mergeMap(action =>
        this.contactService.updateContact(action.contact).pipe(
          map(() => editContactSuccess({ contact: action.contact })),
          catchError(() => of({ type: 'Update Contact Error' }))
        )
      )
    )
  );

  deleteContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteContact),
      mergeMap(action =>
        this.contactService.deleteContact(action.id).pipe(
          map(() => deleteContactSuccess({ id: action.id })),
          catchError(() => of({ type: 'Delete Contact Error' }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private contactService: ContactService) {}
}