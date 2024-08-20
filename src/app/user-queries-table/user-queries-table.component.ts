import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import {
  UserQueriesTableDataSource,
  UserQueriesTableItem,
} from './user-queries-table-datasource';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-user-queries-table',
  templateUrl: './user-queries-table.component.html',
  styleUrl: './user-queries-table.component.scss',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenu,
    MatMenuTrigger,
    MatIcon,
    MatButtonModule,
    MatCardModule,
    MatMenuItem,
  ],
})
export class UserQueriesTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<UserQueriesTableItem>;
  dataSource = new UserQueriesTableDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'menu'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
