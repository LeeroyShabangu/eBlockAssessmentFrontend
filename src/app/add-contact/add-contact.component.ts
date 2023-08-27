import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { addContact, editContact } from '../contact.actions';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {
  contactId?: number;
  newContact?: Contact = {
    name: '',
    surname: '',
    contactInfo: ''
  };

  constructor(private route: ActivatedRoute, private store: Store<{ contacts: Contact[] }>, private router: Router ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    if(id)
    {
      this.route.paramMap.pipe(
        map((params: ParamMap) => params.get('id')),
        switchMap(id => {
          this.contactId = parseInt(id!);
        return this.store.select(state => state.contacts.find(c => c.id === parseInt(id!)));
        })
      ).subscribe(contact => {
        this.newContact = contact;
      });
    }
  }

  CreateOrUpdateContact(): void {
    if(this.newContact!.id)
    {
      this.store.dispatch(editContact({ contact: this.newContact! }));
      this.router.navigate(['/']);
    }
    else
    {
      this.store.dispatch(addContact({ contact: this.newContact! }));
      this.newContact = { name: '', surname: '', contactInfo: '' };
      this.router.navigate(['/']);
    }
    
  }
}
