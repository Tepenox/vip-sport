import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { SubcategoriesService } from '../services/subcategories.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  currentCategoryId: number;
  categories: any[];

  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService, private subcategoriesService: SubcategoriesService) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.currentCategoryId = +params.get('category');
      });

    this.categoriesService.getByParentId(this.currentCategoryId)
      .subscribe((response: any[]) => {
        this.categories = response
        for (let i = 0; i < this.categories.length; i++) {
          this.subcategoriesService.getByParentId(this.categories[i].id)
            .subscribe((response: any[]) => this.categories[i].subcategories = response);
        }
      });
  }

}
