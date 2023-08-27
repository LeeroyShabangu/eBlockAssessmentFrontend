import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { contactReducer } from './contact.reducer';
import { ContactEffects } from './contact.effects';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    AddContactComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ contacts: contactReducer },{
      runtimeChecks: {
        strictStateImmutability: false, 
        strictActionImmutability: false, 
      },
    }),
    EffectsModule.forRoot([ContactEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
