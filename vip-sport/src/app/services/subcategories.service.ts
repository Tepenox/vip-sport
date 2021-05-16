import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subcategory } from 'src/models/Subcategory';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService extends DataService {

  constructor(http: HttpClient) {
    super('http://localhost:3000/subcategories', http);
  }

  getByParentId(parentId: number): Observable<Subcategory[]> {
    let params = new HttpParams().set('parentId', String(parentId));
    return this.http.get<Subcategory[]>(this.url, { params: params });
  }
}
