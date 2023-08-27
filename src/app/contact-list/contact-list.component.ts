import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadContacts, deleteContact } from '../contact.actions';

import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})

export class ContactListComponent implements OnInit {
  contacts: Contact [] = [];

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadContacts());
    this.store.select(state => state).subscribe(state=> { 
      this.contacts = Object.values(state);
      var tempState = this.contacts[0];
      var tempContacts = Object.values(tempState); 
      this.contacts = [];
      
      for( let item of tempContacts )
      {
        this.contacts.push(item);
      }
    });
  }

  deleteContact(id: number): void {
    this.store.dispatch(deleteContact({ id}));
  }
}
