import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(protected url: string, protected http: HttpClient) { }

  getAll(): Observable<Object[]> {
    return this.http.get<Object[]>(this.url);
  }

  getById(id: number): Observable<Object> {
    let params = new HttpParams().set('id', String(id));
    return this.http.get<Object>(this.url, { params: params });
  }

  create(resource: Object): Observable<Object> {
    return this.http.post<Object>(this.url, resource);
  }

  delete(id: number): Observable<Object> {
    return this.http.delete<Object>(this.url + `/${id}`);
  }
}
