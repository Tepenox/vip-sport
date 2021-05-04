import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService extends DataService {

  constructor(http: HttpClient) {
    super('https://my-json-server.typicode.com/taguet/posts/subcategories', http);
  }

  getByParentId(id: number) {
    return this.http.get(this.url + '?parent=' + id);
  }
}
