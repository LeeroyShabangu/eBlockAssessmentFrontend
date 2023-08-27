import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'https://localhost:5000/api';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/contacts`);
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}/contacts`, contact);
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/contacts/${contact.id}`, contact);
  }

  deleteContact(id?: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/contacts/${id}`);
  }

  getContact(id?: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/contacts/${id}`);
  }
}
