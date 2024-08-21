import { Routes } from '@angular/router';
import { QueryFormComponent } from './query-form/query-form.component';
import { UserQueriesTableComponent } from './user-queries-table/user-queries-table.component';
import { QueryComponent } from './query/query.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: QueryFormComponent,
  },
  {
    path: 'get-queries',
    component: UserQueriesTableComponent,
    children: [
      {
        path: ':queryId',
        component: QueryComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
