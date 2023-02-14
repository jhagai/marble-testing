import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeftMenuService {

  _opened = false;

  constructor() {
  }

  toggle(): void {
    this._opened = !this._opened;
  }

  get opened(): boolean {
    return this._opened;
  }
}
