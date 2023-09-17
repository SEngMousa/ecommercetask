import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DeleteDialogComponent } from 'src/app/components/product-delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/modules/shared/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  isLoading = false;

  products: Product[] = [];

  pageSize = 10;
  displayedColumns: string[] = [
    'id',
    'title',
    'price',
    'description',
    'category',
    'image',
    'action',
  ];

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  onScroll(): void {
    const element = this.scrollContainer.nativeElement;
    console.log(element.scrollHeight - element.scrollTop, element.clientHeight);
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.loadProducts();
    }
  }

  loadProducts(): void {
    this.isLoading = true;

    this.productService
      .getProducts(this.products.length + this.pageSize)
      .subscribe((products) => {
        this.products = products;
        this.isLoading = false;
      });
  }

  deleteProduct(id: number, title: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productService.deleteProduct(id).subscribe(() => {
          this.products = this.products.filter((product) => product.id !== id);
        });
      }
    });
  }
}
