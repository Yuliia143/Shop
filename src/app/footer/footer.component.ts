import { Component, OnInit } from '@angular/core';
import { TAGS } from '../../mock-tags';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  tags: {}[] = TAGS;

  constructor() {
  }

  ngOnInit(): void {
  }

}