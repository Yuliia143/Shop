import { Component, Input, OnInit } from '@angular/core';
import { ProductInterface } from '@shared/interfaces/product-interface';

@Component({
  selector: 'app-recommended-product-card',
  templateUrl: './recommended-product-card.component.html',
  styleUrls: ['./recommended-product-card.component.scss']
})
export class RecommendedProductCardComponent implements OnInit {
  @Input() recommendedProduct: ProductInterface;

  constructor() { }

  ngOnInit(): void {
  }

}
