import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
  currentSubcategory: Subcategory;
  categories: Category[];
  subcategories : Subcategory[][] = Array(0);
  threads: Thread[];
  isThreadFormVisible: boolean = false;

  constructor(private route: ActivatedRoute, private threadService: ThreadService, private titleService: Title) { }

  ngOnInit(): void {
    this.route.data.subscribe((response: { categories: Category[], subcategories: Subcategory[][], currentSubcategory: Subcategory } ) => {
      this.categories = response.categories;
      this.currentSubcategory = response.currentSubcategory;
      this.subcategories = response.subcategories;

      console.log(response);

      if (this.currentSubcategory.id != 0)
      this.titleService.setTitle(this.titleService.getTitle() + " " + this.currentSubcategory.name)
    });

    this.threadService.getByParentId(this.currentSubcategory.id)
      .subscribe((response: Thread[]) => {
        this.threads = response;
      });
  }

  toggleThreadForm() {
    this.isThreadFormVisible = !this.isThreadFormVisible;
  }
}
