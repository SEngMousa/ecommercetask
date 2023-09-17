import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEditing: boolean = false;
  productId: number | undefined;
  categories: string[] = [];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      image: ['', Validators.required],
    });
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
    if (this.route.snapshot.params['id']) {
      this.productId = +this.route.snapshot.params['id'];

      this.isEditing = true;
      this.productService.getProduct(this.productId).subscribe((product) => {
        this.productForm.patchValue(product);
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      if (this.isEditing) {
        this.productService
          .updateProduct(this.productId!, productData)
          .subscribe(() => {
            this.router.navigate(['/admin/products']);
          });
      } else {
        this.productService.addProduct(productData).subscribe(() => {
          this.router.navigate(['/admin/products']);
        });
      }
    }
  }
}
