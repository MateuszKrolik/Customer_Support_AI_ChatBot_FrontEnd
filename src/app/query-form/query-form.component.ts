import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DefaultService } from '../../api-client';
import { Router } from '@angular/router';
import { getSessionId } from '../../lib/getUserId';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styleUrl: './query-form.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatProgressSpinner,
    MatIcon,
  ],
})
export class QueryFormComponent {
  private fb = inject(FormBuilder);
  private defaultService = inject(DefaultService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  isFetching = signal(false);

  queryForm = this.fb.group({
    query: [null, [Validators.required, Validators.maxLength(100)]],
  });

  onSubmit(): void {
    if (this.queryForm.valid) {
      const queryText = this.queryForm.value.query;
      if (typeof queryText === 'string') {
        const submitQueryRequest = {
          user_id: getSessionId(),
          query_text: queryText,
        };

        this.isFetching.set(true); // Set isFetching to true before starting the API call

        const subscription = this.defaultService
          .postQueryEndpointPostQueryPost(submitQueryRequest)
          .subscribe({
            next: (response) => {
              console.log('Query submitted successfully:', response);
              this.router.navigate(['/get-queries', response.query_id]);
            },
            complete: () => {
              this.isFetching.set(false);
            },
            error: (error) => {
              console.error('Error submitting query:', error);
              alert('Failed to submit query.');
            },
          });
        this.destroyRef.onDestroy(() => {
          subscription.unsubscribe();
        });
      }
    }
  }
}
