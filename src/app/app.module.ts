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
import { ProjectPickerComponent } from './components/project-picker/project-picker.component';
import { TimePickersComponent } from './components/time-pickers/time-pickers.component';
import { HttpErrorHandler } from './services/http-error-handler.service';
import { MessageService } from 'primeng/api';
import { MyMessageService } from './services/message.service';
import { ProjectsService } from './services/project.service';
import { TimesheetsService } from './services/timesheets.service';

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
  declarations: [AppComponent, TimePickersComponent, ProjectPickerComponent],
  providers: [
    HttpErrorHandler,
    ProjectsService,
    MessageService,
    MyMessageService,
    TimesheetsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
