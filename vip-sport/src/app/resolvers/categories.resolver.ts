import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Category } from 'src/models/Category';
import { CategoriesService } from '../services/categories.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesResolver implements Resolve<Category[]> {
  constructor(private categoriesService: CategoriesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
    let currentCategoryId = +route.paramMap.get('subcategoryID');
    return this.categoriesService.getByParentId(currentCategoryId);
  }
}
