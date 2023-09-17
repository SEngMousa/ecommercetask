import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ProductBoxComponent } from './product-box.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('ProductBoxComponent', () => {
  let component: ProductBoxComponent;
  let fixture: ComponentFixture<ProductBoxComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ProductBoxComponent],
      imports: [MatIconModule, TranslateModule.forRoot(), MatTooltipModule],
      providers: [{ provide: MatDialog, useValue: dialogSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open product details dialog', () => {
    const product = {
      id: 1,
      description: 'Test Description',
      title: 'Test Product',
      price: 100,
      category: 'Test Category',
      rating: { rate: 4.5, count: 10 },
      image: 'test-image-url.jpg',
    };

    component.product = product;
    fixture.detectChanges();

    const viewDetailsButton =
      fixture.nativeElement.querySelector('.view-details');
    viewDetailsButton.click();

    expect(dialogSpy.open).toHaveBeenCalledWith(ProductDetailsComponent, {
      width: 'auto',
      data: product,
    });
  });
});
