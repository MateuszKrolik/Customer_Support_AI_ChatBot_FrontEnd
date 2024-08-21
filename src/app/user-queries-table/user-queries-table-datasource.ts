// src/app/user-queries-table/user-queries-table.component.ts
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { DefaultService, QueryModel } from '../../api-client';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { getSessionId } from '../../lib/getUserId';

// TODO: Replace this with your own data model type
export interface UserQueriesTableItem {
  query_id: string;
  query_text: string;
}

/**
 * Data source for the UserQueriesTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */

@Injectable({
  providedIn: 'root',
})
export class UserQueriesTableDataSource extends DataSource<UserQueriesTableItem> {
  private dataSubject = new BehaviorSubject<UserQueriesTableItem[]>([]);
  data: UserQueriesTableItem[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  private destroyRef = inject(DestroyRef);

  constructor(private defaultService: DefaultService) {
    super();
    this.getQueriesDataByUserIdFromApi();
  }

  getQueriesDataByUserIdFromApi(): void {
    const userId = getSessionId();
    const subscription = this.defaultService
      .getQueriesByUserIdGetQueriesGet(userId)
      .subscribe({
        next: (resData: QueryModel[]) => {
          this.data = resData.map((query) => ({
            query_id: query.query_id || '',
            query_text: query.query_text || '',
          }));
          console.log('Data fetched:', this.data);
          this.dataSubject.next(this.data);
        },
        error: (error) => {
          console.error(error);
        },
      });

    // Unsubscribe when the component is destroyed
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<UserQueriesTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(
        this.dataSubject.asObservable(),
        this.paginator.page,
        this.sort.sortChange
      ).pipe(
        map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        })
      );
    } else {
      return observableOf(this.data);
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: UserQueriesTableItem[]): UserQueriesTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: UserQueriesTableItem[]): UserQueriesTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'query_text':
          return compare(a.query_text, b.query_text, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(
  a: string | number,
  b: string | number,
  isAsc: boolean
): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
