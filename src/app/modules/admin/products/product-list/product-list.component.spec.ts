import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '../services/product.service';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule } from '@angular/material/table';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    productService = jasmine.createSpyObj('ProductService', [
      'getProducts',
      'deleteProduct',
    ]);
    const testProduct = [].constructor(100).map(() => ({
      id: 1,
      description: 'Test Description',
      title: 'Test Product',
      price: 100,
      category: 'Test Category',
      rating: { rate: 4.5, count: 10 },
    }));
    productService.getProducts.and.returnValue(
      of([
        {
          id: 1,
          description: 'Test Description',
          title: 'Test Product',
          price: 100,
          category: 'Test Category',
          rating: { rate: 4.5, count: 10 },
          image: 'test-image-url.jpg',
        },
      ])
    );
    dialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [
        { provide: ProductService, useValue: productService },
        { provide: MatDialog, useValue: dialog },
      ],
      imports: [TranslateModule.forRoot(), RouterTestingModule, MatTableModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    expect(productService.getProducts).toHaveBeenCalledWith(component.pageSize);
  });
});
