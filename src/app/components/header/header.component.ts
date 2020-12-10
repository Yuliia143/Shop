import { Component, OnInit } from '@angular/core';
import { CATEGORIES } from '@mocks/mock-categories';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  categories: {}[] = CATEGORIES;

  constructor() {
  }

  ngOnInit(): void {
  }

}
