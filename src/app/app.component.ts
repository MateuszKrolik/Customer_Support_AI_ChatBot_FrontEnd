import {
  Component,
  // DestroyRef, inject, Query
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { DefaultService, QueryModel } from '../api-client';
import { NavbarComponent } from './navbar/navbar.component';
import { QueryFormComponent } from './query-form/query-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, QueryFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // providers: [DefaultService],
})
export class AppComponent {
  title = 'Customer_Support_AI_ChatBot_FrontEnd';
  // private destroyRef = inject(DestroyRef);
  // constructor(private defaultService: DefaultService) {} // Inject the API service

  // ngOnInit(): void {
  //   this.getQueriesDataByUserIdFromApi();
  //   this.getQueryDataByQueryUuidFromApi();
  // }

  // getQueriesDataByUserIdFromApi(): void {
  //   const userId = 'nobody'; // Replace with the actual user ID
  //   const subscription = this.defaultService
  //     .getQueriesByUserIdGetQueriesGet(userId)
  //     .subscribe({
  //       next: (resData: QueryModel[]) => {
  //         console.log(resData);
  //       },
  //       error: (error) => {
  //         console.error(error);
  //       },
  //     });

  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }
  // getQueryDataByQueryUuidFromApi(): void {
  //   const queryId = '272b52aa7f08454db6ec6ff38af71897'; // Replace with the actual user ID
  //   const subscription = this.defaultService
  //     .getQueryEndpointGetQueriesQueryIdGet(queryId)
  //     .subscribe({
  //       next: (resData: QueryModel) => {
  //         console.log(resData);
  //       },
  //       error: (error) => {
  //         console.error(error);
  //       },
  //     });

  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }
}
