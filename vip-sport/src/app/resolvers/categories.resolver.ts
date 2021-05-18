import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from 'src/models/Category';
import { Subcategory } from 'src/models/Subcategory';
import { CategoriesService } from '../services/categories.service';
import { SubcategoriesService } from '../services/subcategories.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesResolver implements Resolve<Subcategory[]> {
  constructor(private categoriesService: CategoriesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Subcategory[]> {
    let currentCategoryId = +route.paramMap.get('subcategoryID');
    return this.categoriesService.getByParentId(currentCategoryId);
  }
}
