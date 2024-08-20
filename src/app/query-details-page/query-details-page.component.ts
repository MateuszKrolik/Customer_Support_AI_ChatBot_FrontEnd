import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserQueriesTableComponent } from "../user-queries-table/user-queries-table.component";

@Component({
  selector: 'app-query-details-page',
  standalone: true,
  imports: [ NavbarComponent, UserQueriesTableComponent],
  templateUrl: './query-details-page.component.html',
  styleUrl: './query-details-page.component.scss',
})
export class QueryDetailsPageComponent {}
