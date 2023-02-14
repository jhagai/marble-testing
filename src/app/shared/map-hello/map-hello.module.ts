import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MapHelloComponent} from './pages/map-hello/map-hello.component';
import {RouterModule, Routes} from "@angular/router";
import {MatExpansionModule} from "@angular/material/expansion";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";

const routes: Routes = [
  {
    path: '',
    component: MapHelloComponent,
  },
];

@NgModule({
  declarations: [
    MapHelloComponent
  ],
  imports: [
    CommonModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ]
})
export class MapHelloModule {
}
