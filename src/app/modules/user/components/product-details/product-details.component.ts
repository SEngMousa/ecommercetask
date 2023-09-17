import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/modules/shared/models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public product: Product) {}
  getArrayFromNumber(number: number) {
    return [].constructor(Math.round(number));
  }
}
