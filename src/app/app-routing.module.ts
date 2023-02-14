import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/autocomplete',
    pathMatch: 'full',
  },
  {
    path: 'autocomplete',
    loadChildren: () => import('./shared/autocomplete/autocomplete.module').then((m) => m.AutocompleteModule)
  },
  {
    path: 'hello-map',
    loadChildren: () => import('./shared/map-hello/map-hello.module').then((m) => m.MapHelloModule)
  },
  {
    path: 'cache-last',
    loadChildren: () => import('./shared/cache-last/cache-last.module').then((m) => m.CacheLastModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
