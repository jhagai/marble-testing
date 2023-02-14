import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutocompleteModule} from "./autocomplete/autocomplete.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AutocompleteModule,
  ],
  exports: [AutocompleteModule]
})
export class SharedModule {
}
