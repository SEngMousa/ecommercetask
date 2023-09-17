import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { ProductBoxComponent } from '../../components/product-box/product-box.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let categoryService: jasmine.SpyObj<CategoryService>;
  const mockProducts = [
    {
      id: 1,
      title: 'Product 1',
      price: 10,
      category: 'Category A',
      image: 'image-url-1.jpg',
      description: 'test',
    },
    {
      id: 2,
      title: 'Product 2',
      price: 20,
      category: 'Category B',
      image: 'image-url-2.jpg',
      description: 'test',
    },
  ];
  beforeEach(async () => {
    productService = jasmine.createSpyObj('ProductService', [
      'getProducts',
      'getProductsByCategory',
    ]);
    categoryService = jasmine.createSpyObj('CategoryService', [
      'getCategories',
    ]);
    productService.getProducts.and.returnValue(of(mockProducts));
    productService.getProductsByCategory.and.returnValue(of(mockProducts));
    categoryService.getCategories.and.returnValue(
      of(['Category A', 'Category B'])
    );

    await TestBed.configureTestingModule({
      declarations: [ProductListComponent, ProductBoxComponent],
      providers: [
        { provide: ProductService, useValue: productService },
        { provide: CategoryService, useValue: categoryService },
      ],
      imports: [
        TranslateModule.forRoot(),
        MatIconModule,
        MatDialogModule,
        BrowserAnimationsModule,
        MatTooltipModule,
      ],
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

  it('should retrieve products on initialization', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(productService.getProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
    expect(component.isLoading).toBe(false);
  });

  it('should retrieve categories on initialization', () => {
    const mockCategories = ['Category A', 'Category B'];

    component.ngOnInit();
    fixture.detectChanges();

    expect(categoryService.getCategories).toHaveBeenCalled();
    expect(component.categories).toEqual(mockCategories);
  });

  it('should update products when category is changed', () => {
    const mockCategory = 'Category A';

    productService.getProductsByCategory.and.returnValue(of(mockProducts));

    component.categoryChanged(mockCategory);

    fixture.detectChanges();

    expect(productService.getProductsByCategory).toHaveBeenCalledWith(
      mockCategory
    );

    expect(component.products).toEqual(mockProducts);
    console.log(component.products);
    expect(component.isLoading).toBe(false);
  });

  it('should set grid layout value', () => {
    const mockGridLayout = 'col-lg-4';

    component.setGridLayout(mockGridLayout);
    fixture.detectChanges();

    expect(component.grid).toBe(mockGridLayout);
  });
});
