import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AppComponent = class AppComponent {
    constructor() {
        this.rootURI = "https://localhost:44352/api";
        this.results = ["Byg1", "Byg2", "Byg3", "Ombyg1", "Ombyg2"];
        this.title = 'juultimesedler';
        this.items = ["Byg1", "Byg2", "Byg3", "Ombyg1", "Ombyg2", "Ombyg3", "Riv1", "Riv2", "Riv3"];
        this.startTime = new Date(2022, 2, 15, 7, 0, 0);
        this.endTime = new Date(2022, 2, 15, 16, 0, 0);
        // PROJECT PICKER
        this.projects = [
            { name: "Oslo1", description: "Komplet riv og byg ny H & M" },
            { name: "Oslo2", description: "Ny Loius Vuitton" },
            { name: "Gardamoen", description: "Renovation Gardamoen" },
        ];
    }
    //definedTasks: any[];
    filterProject(event) {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered = [];
        let query = event.query;
        for (let i = 0; i < this.projects.length; i++) {
            let project = this.projects[i];
            if (project.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(project);
            }
        }
        this.filteredProjects = filtered;
    }
    ngOnInit() {
        this.es = {
            firstDayOfWeek: 1,
            dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
            dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
            dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
            monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
            monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
            today: 'Hoy',
            clear: 'Borrar'
        };
        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month - 1;
        let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;
        this.minDate = new Date();
        this.minDate.setMonth(prevMonth);
        this.minDate.setFullYear(prevYear);
        this.maxDate = new Date();
        this.maxDate.setMonth(nextMonth);
        this.maxDate.setFullYear(nextYear);
        let invalidDate = new Date();
        invalidDate.setDate(today.getDate() - 1);
        this.invalidDates = [today, invalidDate];
        // this.definedTasks = [
        //   { name: "Rive væg", code: "riveVaeg" },
        //   { name: "Slæbe gips", code: "slæbeGips" },
        //   { name: "Montere vinkler", code: "montereVinkler" },
        //   { name: "Montere gips", code: "montereGips" },
        //   { name: "Spartle gips", code: "spartleGips" },
        //   { name: "Rydde op", code: "ryddeOp" },
        //   { name: "Feje", code: "feje" },
        // ];
        // LISTBOX
        this.definedTasks = [
            {
                label: "GIPS",
                value: "gips",
                items: [
                    { label: "Slæbe gipsplader", value: "slæbeGipsplader" },
                    { label: "Montere vinkler", value: "montereVinkler" },
                    { label: "Skrue gipsplader", value: "skrueGipsplader" },
                    { label: "Spartle gipsplader", value: "spartleGipsplader" }
                ]
            },
            {
                label: "RIVE",
                value: "rive",
                items: [
                    { label: "Rive gammel gipsvæg", value: "riveGammelGipsVaeg" },
                    { label: "Rive gammel butik", value: "riveGammelButik" },
                    { label: "Rive gammel kontor", value: "riveGammelKontor" },
                ]
            },
            {
                label: "OPRYDNING",
                value: "oprydning",
                items: [
                    { label: "Generel oprydning", value: "generelOprydning" },
                    { label: "Feje", value: "feje" },
                    { label: "Fjerne skrammel", value: "fjerneSkrammel" },
                ]
            },
            {
                label: "AFVIG",
                value: "afvig",
                items: [
                    { label: "Afvig01", value: "afvig01" },
                ]
            },
        ];
    }
    search(event) {
        let filtered = [];
        let query = event.query;
        console.log(query);
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            if (item.includes(query.toLowerCase())) {
                console.log(item);
                filtered.push(item);
                this.results.push(item);
            }
        }
        this.filteredItems = filtered;
    }
    handleDropdown(event) {
        console.log(event.query);
    }
    filterItems(event) {
        let filtered = [];
        let query = event.query;
        console.log(query);
        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];
            if (item.includes(query.toLowerCase())) {
                console.log(item);
                filtered.push(item);
            }
        }
        this.filteredItems = filtered;
    }
    submitTimesheets(event) {
        console.log(event);

        const data = { username: 'example' };

        fetch(rootURI + '/test', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map