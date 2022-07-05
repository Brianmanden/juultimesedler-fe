import { __decorate } from "tslib";
import { AppComponent } from './app.component';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
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
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
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
        ],
        bootstrap: [AppComponent],
        declarations: [AppComponent, TimePickersComponent],
        providers: [],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map