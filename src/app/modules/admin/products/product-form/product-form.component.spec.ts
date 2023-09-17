import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let categoryService: jasmine.SpyObj<CategoryService>;
  let router: jasmine.SpyObj<Router>;
  beforeEach(() => {
    productService = jasmine.createSpyObj('ProductService', [
      'getProduct',
      'updateProduct',
      'addProduct',
    ]);
    categoryService = jasmine.createSpyObj('CategoryService', [
      'getCategories',
    ]);
    categoryService.getCategories.and.returnValue(of([]));
    productService.getProduct.and.returnValue(
      of({
        id: 1,
        title: 'Product 1',
        description: 'Description',
        price: 10,
        category: 'Category1',
        image: 'image-url',
      })
    );
    productService.updateProduct.and.returnValue(
      of({
        id: 1,
        title: 'Product 1',
        description: 'Description',
        price: 10,
        category: 'Category1',
        image: 'image-url',
      })
    );
    productService.addProduct.and.returnValue(
      of({
        id: 1,
        title: 'Product 1',
        description: 'Description',
        price: 10,
        category: 'Category1',
        image: 'image-url',
      })
    );

    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ProductFormComponent],

      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      providers: [
        FormBuilder,
        { provide: ProductService, useValue: productService },
        { provide: CategoryService, useValue: categoryService },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '1' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls', () => {
    expect(component.productForm.get('title')?.value).toBe('Product 1');
    expect(component.productForm.get('description')?.value).toBe('Description');
    expect(component.productForm.get('price')?.value).toBe(10);
    expect(component.productForm.get('category')?.value).toBe('Category1');
    expect(component.productForm.get('image')?.value).toBe('image-url');
  });

  it('should load categories', () => {
    const categories = ['Category1', 'Category2'];
    categoryService.getCategories.and.returnValue(of(categories));
    component.ngOnInit();
    expect(component.categories).toEqual(categories);
  });

  it('should set product data when in edit mode', () => {
    component.ngOnInit();
    expect(component.isEditing).toBe(true);
    expect(component.productId).toBe(1);
    expect(productService.getProduct).toHaveBeenCalledWith(1);
    console.log(component.productForm.value);
    expect(component.productForm.value).toEqual({
      title: 'Product 1',
      description: 'Description',
      price: 10,
      category: 'Category1',
      image: 'image-url',
    });
  });

  it('should navigate after form submission', () => {
    component.onSubmit();
    expect(productService.updateProduct).toHaveBeenCalledWith(
      1,
      jasmine.any(Object)
    );
    expect(router.navigate).toHaveBeenCalledWith(['/admin/products']);
  });
});
