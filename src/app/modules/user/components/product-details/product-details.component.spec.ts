import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductDetailsComponent } from './product-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      imports: [MatDialogModule, TranslateModule.forRoot(), MatIconModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render product details', () => {
    const mockProduct = {
      id: 1,
      description: 'Test Description',
      title: 'Test Product',
      price: 100,
      category: 'Test Category',
      rating: { rate: 4.5, count: 10 },
      image: 'test-image-url.jpg',
    };

    component.product = mockProduct;
    fixture.detectChanges();

    const element = fixture.nativeElement;
    expect(element.querySelector('.dialog-title').textContent).toContain(
      mockProduct.title
    );

    expect(element.querySelector('.product-image img').src).toContain(
      mockProduct.image
    );
    expect(element.querySelector('.category p').textContent).toContain(
      'Test Category'
    );
    expect(element.querySelector('.price p').textContent).toContain(
      `price: $100.00`
    );
    expect(element.querySelector('.description p').textContent).toContain(
      'description: Test Description'
    );
  });
});
