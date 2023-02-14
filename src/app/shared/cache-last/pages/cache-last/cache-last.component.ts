import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {cacheLast} from "../../utils/cache-last.util";
import {Observable} from "rxjs";

@Component({
  selector: 'app-cache-last',
  templateUrl: './cache-last.component.html',
  styleUrls: ['./cache-last.component.scss']
})
export class CacheLastComponent implements OnInit {

  formGroup: FormGroup;
  source$: Observable<string>;
  observable$: Observable<string>;
  show: boolean = true;

  constructor(formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({myInput: formBuilder.control('')});
    this.source$ = this.formGroup.controls['myInput'].valueChanges;
    this.observable$ = this.source$.pipe(cacheLast());
  }

  ngOnInit(): void {

  }

  toggleShow(): void {
    this.show = !this.show;
  }
}
