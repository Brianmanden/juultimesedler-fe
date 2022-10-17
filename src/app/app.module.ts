import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { MultiSelectModule } from 'primeng/multiselect';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { TimePickersComponent } from './time-pickers/time-pickers.component';
import { HttpErrorHandler } from './http-error-handler.service';
import { MessageService } from 'primeng/api';
import { MyMessageService } from './message.service';

import { ProjectsService } from './project.service';
// import { ProjectsService } from './project.service';

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
    MultiSelectModule,
    MessagesModule,
    MessageModule,
    DividerModule,
    TagModule,
    HttpClientModule,
  ],
  declarations: [AppComponent, TimePickersComponent],
  providers: [
    HttpErrorHandler,
    ProjectsService,
    MessageService,
    MyMessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
