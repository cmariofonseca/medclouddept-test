import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyServiceService {
  constructor(private http: HttpClient) {}

  getRandomUser() {
    return this.http.get('https://randomuser.me/api/').pipe(
      map((response) => {
        return {
          apiName: 'randomuser',
          data: response,
          isError: false,
        };
      }),
      catchError((error) =>
        of({
          apiName: 'randomuser',
          error: error,
          isError: true,
        })
      )
    );
  }

  getAgeOfName(name?: string) {
    const queryString = name ? `?name=${name}` : '';
    return this.http.get(`https://api.agify.io/${queryString}`).pipe(
      map((response) => {
        return {
          apiName: 'agify',
          data: response,
          isError: false,
        };
      }),
      catchError((error) =>
        of({ apiName: 'agify', errorMessage: error.error.error, isError: true })
      )
    );
  }

  getCurrentPrice() {
    return this.http
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .pipe(
        map((response) => {
          return {
            apiName: 'coindesk',
            data: response,
            isError: false,
          };
        }),
        catchError((error) =>
          of({
            apiName: 'coindesk',
            error: error,
            isError: true,
          })
        )
      );
  }

  putEndpoint(payload: any) {
    return this.http
      .put('https://jsonplaceholder.typicode.com/posts/1', payload)
      .pipe(
        map((response) => {
          return {
            apiName: 'jsonplaceholder',
            updated: new Date().getTime(),
            data: response,
            isError: false,
          };
        }),
        catchError((error) =>
          of({
            apiName: 'jsonplaceholder',
            error: error,
            isError: true,
          })
        )
      );
  }
}
