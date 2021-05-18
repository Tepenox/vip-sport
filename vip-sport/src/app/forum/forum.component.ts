import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/models/Category';
import { Subcategory } from 'src/models/Subcategory';
import { Thread } from 'src/models/Thread';
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
  categories: Category[];
  subcategories : Subcategory[][] = Array(0);
  threads: Thread[];
  isThreadFormVisible: boolean = false;

  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService, private subcategoriesService: SubcategoriesService, private threadService: ThreadService) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.currentCategoryId = +params.get('subcategoryID');
      });

    this.route.data.subscribe(response => {
      this.categories = response.categories;
      this.subcategories = response.subcategories;
    });

    this.threadService.getByParentId(this.currentCategoryId)
      .subscribe((response: Thread[]) => {
        this.threads = response;
      });
  }

  toggleThreadForm() {
    this.isThreadFormVisible = !this.isThreadFormVisible;
  }
}
