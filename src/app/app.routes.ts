import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { QueryDetailsPageComponent } from './query-details-page/query-details-page.component';
import { QueryFormComponent } from './query-form/query-form.component';

export const routes: Routes = [
  {
    path: '',
    component: QueryFormComponent,
  },
  {
    path: 'query-details',
    component: QueryDetailsPageComponent,
  },
];
