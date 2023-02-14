import {Component} from '@angular/core';
import {interval, map, Subject, timer} from "rxjs";
import {auditMap} from "./shared/audit-map/utils/audit-map.utils";
import {cacheLast} from "./shared/cache-last/utils/cache-last.util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-demo';
  value?: string;

  release$ = new Subject<void>();

  obs$ = interval(1000).pipe(
    cacheLast()
  );

}
