import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/models/Category';
import { Subcategory } from 'src/models/Subcategory';
import { Thread } from 'src/models/Thread';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  currentSubcategory: Subcategory;
  categories: Category[];
  subcategories : Subcategory[][];
  threads: Thread[];
  isThreadFormVisible: boolean = false;

  constructor(private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit(): void {
    this.route.data.subscribe(response  => {
      this.categories = response.categories;
      this.currentSubcategory = response.currentSubcategory;
      this.subcategories = response.subcategories;
      this.threads = response.threadList;

      if (this.currentSubcategory.id != 0)
      this.titleService.setTitle(this.titleService.getTitle() + " " + this.currentSubcategory.name)
    });
  }

  toggleThreadForm() {
    this.isThreadFormVisible = !this.isThreadFormVisible;
  }
}
