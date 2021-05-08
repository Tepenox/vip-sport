import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { SubcategoriesService } from '../services/subcategories.service';
import { ThreadService } from '../services/thread.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  currentCategoryId: number;
  categories: any[];
  threads: any[];

  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService, private subcategoriesService: SubcategoriesService, private threadService: ThreadService) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => this.currentCategoryId = +params.get('subcategoryID'));

    this.categoriesService.getByParentId(this.currentCategoryId)
      .subscribe((response: any[]) => {
        this.categories = response
        for (let i = 0; i < this.categories.length; i++) {
          this.subcategoriesService.getByParentId(this.categories[i].id)
            .subscribe((response: any[]) => this.categories[i].subcategories = response);
        }
      });

    this.threadService.getByParentId(this.currentCategoryId)
      .subscribe((response: any[]) => {
        console.log(response);
        this.threads = response;
        console.log(this.threads);
      });
  }

}
