import { query } from '@angular/animations';
import { Component } from '@angular/core';
import { SelectItemGroup } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  results: string[] = ["Byg1","Byg2","Byg3","Ombyg1","Ombyg2"];
  showButtonBar: boolean;
  text: string;
  title = 'juultimesedler';

  value: Date;
  items: string[] = ["Byg1","Byg2","Byg3","Ombyg1","Ombyg2", "Ombyg3", "Riv1", "Riv2", "Riv3" ];
  filteredItems: any[];
  jobDesc: string;
  
  dateValue: Date;
  dates: Date[];
  date1: Date;
  date2: Date;
  date3: Date;
  date4: Date;
  date5: Date;
  date6: Date;
  date7: Date;
  date8: Date;
  date9: Date;
  date10: Date;
  date11: Date;
  date12: Date;
  date13: Date;
  date14: Date;
  invalidDates: Array<Date>

  startTime: Date = new Date(2022, 2, 15, 7, 0, 0);
  endTime: Date   = new Date(2022, 2, 15, 16, 0, 0);
  
  rangeDates: Date[];
  minDate: Date;
  maxDate: Date;
  es: any;

  // TEMP - Project picker
  countries: any[] = [{name: "SWE"}, {name: "NOR"}, {name: "DEN"}, ];
  selectedCountryAdvanced: any[];
  filteredCountries: any[];

  // LISTBOX
  selectedTasks: any[];
  // definedTasks: SelectItemGroup[];
  definedTasks: any[];

  // MULTISELECT

  filterCountry(event: { query: any; }) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered : any[] = [];
    let query = event.query;

    for(let i = 0; i < this.countries.length; i++) {
        let country = this.countries[i];
        if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }

    this.filteredCountries = filtered;
}

  ngOnInit() {
      this.es = {
          firstDayOfWeek: 1,
          dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
          dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
          dayNamesMin: [ "D","L","M","X","J","V","S" ],
          monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
          monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
          today: 'Hoy',
          clear: 'Borrar'
      }

      let today = new Date();
      let month = today.getMonth();
      let year = today.getFullYear();
      let prevMonth = (month === 0) ? 11 : month -1;
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
      this.invalidDates = [today,invalidDate];

      this.definedTasks = [
        { name: "Rive væg", code: "riveVaeg" },
        { name: "Slæbe gips", code: "slæbeGips" },
        { name: "Montere vinkler", code: "montereVinkler" },
        { name: "Montere gips", code: "montereGips" },
        { name: "Spartle gips", code: "spartleGips" },
        { name: "Rydde op", code: "ryddeOp" },
        { name: "Feje", code: "feje" },
      ];

      // LISTBOX
      // this.definedTasks = [
      //   {
      //     label: "GIPS",
      //     value: "gips",
      //     items: [
      //       { label: "Slæbe gipsplader", value: "slæbeGipsplader" },
      //       { label: "Montere vinkler", value: "montereVinkler" },
      //       { label: "Skrue gipsplader", value: "skrueGipsplader" },
      //       { label: "Spartle gipsplader", value: "spartleGipsplader" }
      //     ]
      //   },
      //   {
      //     label: "RIVE",
      //     value: "rive",
      //     items: [
      //       { label: "Rive gammel gipsvæg", value: "riveGammelGipsVaeg" },
      //       { label: "Rive gammel butik", value: "riveGammelButik" },
      //       { label: "Rive gammel kontor", value: "riveGammelKontor" },
      //     ]
      //   },
      //   {
      //     label: "Oprydning",
      //     value: "oprydning",
      //     items: [
      //       { label: "Generel oprydning", value: "generelOprydning" },
      //       { label: "Feje", value: "feje" },
      //       { label: "Fjerne skrammel", value: "fjerneSkrammel" },
      //     ]
      //   }
      // ];
  }

  search(event: { query: any; }) {
    let filtered : any[] = [];
    let query = event.query;
    console.log(query);

    for(let i = 0; i < this.items.length; i++) {
        let item = this.items[i];
        if (item.includes(query.toLowerCase())) {
          console.log(item);
          filtered.push(item);
          this.results.push(item);
        }
    }

    this.filteredItems = filtered;
  }

  handleDropdown(event: { query: any; }) {
    console.log(event.query);
  }

  filterItems(event: { query: any; }) {
    let filtered : any[] = [];
    let query = event.query;
    console.log(query);

    for(let i = 0; i < this.items.length; i++) {
        let item = this.items[i];
        if (item.includes(query.toLowerCase())) {
          console.log(item);
          filtered.push(item);
        }
    }

    this.filteredItems = filtered;
  }
}