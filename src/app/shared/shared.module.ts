import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutocompleteModule} from "./autocomplete/autocomplete.module";
import {FormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {IntroModule} from "./intro/intro.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AutocompleteModule,
    IntroModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
  ],
  exports: [AutocompleteModule]
})
export class SharedModule {
}
