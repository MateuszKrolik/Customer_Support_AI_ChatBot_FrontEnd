import {
  Component,
  DestroyRef,
  inject,
  Input,
  SimpleChanges,
  signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultService, QueryModel } from '../../api-client';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-query',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCardContent,
    MatCard,
    MatCardTitle,
    CommonModule,
    RouterModule,
    MatIcon,
    MatProgressSpinner
  ],
  templateUrl: './query.component.html',
  styleUrl: './query.component.scss',
  providers: [DefaultService],
})
export class QueryComponent {
  @Input() queryId!: string;
  private defaultService = inject(DefaultService);
  private destroyRef = inject(DestroyRef);
  queries$?: Observable<QueryModel>;
  query = signal<QueryModel | undefined>(undefined);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['queryId'] && this.queryId) {
      this.fetchQuery();
    }
  }

  fetchQuery(): void {
    this.queries$ = this.defaultService.getQueryEndpointGetQueriesQueryIdGet(
      this.queryId
    );
    const subscription = this.queries$.subscribe({
      next: (query) => {
        console.log(query);
        this.query.set(query);
      },
      error: (error) => {
        console.error(error);
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
