import {Component, OnInit} from '@angular/core';
import {LeftMenuService} from "../../services/left-menu.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private leftMenuService: LeftMenuService) {
  }

  ngOnInit(): void {
  }

  toggleLeftMenu() {
    this.leftMenuService.toggle();
  }

}
