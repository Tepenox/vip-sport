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
export class SubcategoriesResolver implements Resolve<Subcategory[][]> {
  constructor(private categoriesService: CategoriesService, private subcategoriesService: SubcategoriesService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Subcategory[][]> {
    let currentCategoryId = +route.paramMap.get('subcategoryID');

    if (currentCategoryId != 0) {
      this.subcategoriesService.getById(currentCategoryId)
      .subscribe((subcategories: Subcategory) => {
        if (!subcategories) {
          this.router.navigate(['**']);
          return null;
        }
      });
    }
    
    return this.categoriesService.getByParentId(currentCategoryId).pipe(
      map((categories: Category[]) => {
        let subcategories = [];
        for (let i = 0; i < categories.length; i++) {
          subcategories[i] = [];
          this.subcategoriesService.getByParentId(categories[i].id)
            .subscribe((response:Subcategory[]) => subcategories[i] = response);
        }
        return subcategories;
      })
    );    
  }
}
