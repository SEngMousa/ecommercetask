import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/modules/shared/models/product.model';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.scss'],
})
export class ProductBoxComponent {
  constructor(private dialog: MatDialog) {}

  @Input() product: Product = {} as Product;

  viewDetails(product: Product): void {
    this.dialog.open(ProductDetailsComponent, {
      width: 'auto',
      data: product,
    });
  }

  getArrayFromNumber(number: number) {
    return [].constructor(Math.round(number));
  }
}
