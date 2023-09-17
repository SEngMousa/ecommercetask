import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/modules/shared/models/product.model';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { fadeInAnimation } from 'src/app/modules/shared/animations/fade-in.animation';
import { scaleInAnimation } from 'src/app/modules/shared/animations/scale-in.animation';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],

  animations: [fadeInAnimation, scaleInAnimation],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = true;

  selectedCategory?: string;
  categories: string[] = [];
  public grid: string = 'col-xl-3 col-md-6';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}
  ngOnInit(): void {
    this.getProducts();
    this.categoryService.getCategories().subscribe((categories: string[]) => {
      this.categories = categories;
    });
  }

  getProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      this.isLoading = false;
    });
  }
  categoryChanged(category: string) {
    this.isLoading = true;
    this.selectedCategory = category;
    this.productService
      .getProductsByCategory(category)
      .pipe(debounceTime(300))
      .subscribe((products: Product[]) => {
        this.products = products;
        this.isLoading = false;
      });
  }

  setGridLayout(value: string) {
    this.grid = value;
  }
}
