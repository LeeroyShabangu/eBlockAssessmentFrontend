import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <header>
      <h1>Contact App</h1>
    </header>
    <nav>
      <a routerLink="/" routerLinkActive="active">Contact List</a>
      <a routerLink="/add" routerLinkActive="active">Add Contact</a>
    </nav>
    <router-outlet></router-outlet>
  `

})
export class AppComponent {
  title = 'contacts-app';
}
