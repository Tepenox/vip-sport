import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/models/Category';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends DataService{
  constructor(http: HttpClient) {
      super('http://localhost:3000/categories', http);
   }

  getByParentId(parentId: number): Observable<Category[]> {
    let params = new HttpParams().set('parentId', String(parentId));
    return this.http.get<Category[]>(this.url, { params: params });
  }
}
