import {Component, OnInit} from '@angular/core';
import {LeftMenuService} from "../../services/left-menu.service";

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.scss']
})
export class LeftMenuComponent implements OnInit {

  constructor(private leftMenuService: LeftMenuService) {
  }

  ngOnInit(): void {
  }

  get opened() {
    return this.leftMenuService.opened;
  }
}
