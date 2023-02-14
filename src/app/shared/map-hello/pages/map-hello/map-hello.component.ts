import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable, Subject} from "rxjs";
import {mapHello} from "../../utils/map-hello.util";

@Component({
  selector: 'app-map-hello',
  templateUrl: './map-hello.component.html',
  styleUrls: ['./map-hello.component.scss']
})
export class MapHelloComponent implements OnInit {

  formGroup: FormGroup;
  private _submit = new Subject<string>();
  mapped$: Observable<string>;

  constructor(formBilder: FormBuilder) {
    this.formGroup = formBilder.group({'name': formBilder.control('')});
    this.mapped$ = this._submit.asObservable().pipe(mapHello());
  }

  ngOnInit(): void {
  }

  submitForm(name: string) {
    this._submit.next(name);
  }

}
