import { AppComponent }   from './app.component';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';

import { AutoCompleteModule } from 'primeng/autocomplete';


@NgModule({
  imports: [
    AutoCompleteModule,
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule,
    FormsModule,
    TabViewModule,
    InputTextModule,
    ListboxModule,
  ],
  bootstrap: [AppComponent],
  declarations: [ AppComponent ],
  providers: [],
})
export class AppModule { }
