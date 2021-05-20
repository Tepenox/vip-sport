import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Subcategory } from 'src/models/Subcategory';
import { SubcategoriesService } from '../services/subcategories.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentSubcategoryResolver implements Resolve<Subcategory> {
  constructor(private subcategoriesService: SubcategoriesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Subcategory> {
    let currentCategoryId = +route.paramMap.get('subcategoryID');
    if (currentCategoryId == 0) {
      return of(new Subcategory(0, "Accueil", 0, "Accueil"));
    }
    return this.subcategoriesService.getById(currentCategoryId);
  }
}
