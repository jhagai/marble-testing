import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {delay, finalize, map, Observable, of, tap} from "rxjs";
import {autocomplete} from "../../utils/autocomplete-operator.util";

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['Ale', 'Lager', 'Porter', 'Stout', 'Blond ales', 'Brown ales', 'Pale ales', 'India Pale ale', 'Wheat', 'Pilsner', 'Sour ale'];
  filteredOptions$: Observable<string[]> = of([]);

  isLoading = false;

  events: string[] = [];

  ngOnInit() {
    const source$ = this.myControl.valueChanges;

    const searchFn = (value: string) => of(void 0)
      .pipe(
        tap(() => {
          this.isLoading = true;
          this.events.push(`Start searching ${value}`);
        }),
        delay(2000),
        map(() => this._filter(value)),
        finalize(() => this.isLoading = false),
        tap(
          {
            next: () => this.events.push(`Done ${value}`),
            error: () => this.events.push(`Error ${value}`)
          }
        )
      );

    this.filteredOptions$ = source$.pipe(
      autocomplete(1000, searchFn
      )
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  clearEvent() {
    this.events = [];
  }
}
