import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { UserRoutingModule } from './user-routing.module';
import { ProductBoxComponent } from './components/product-box/product-box.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductBoxComponent,
    LayoutComponent,
    HeaderComponent,
    ProductDetailsComponent,
  ],
  imports: [CommonModule, SharedModule, UserRoutingModule],
  providers: [CategoryService, ProductService],
})
export class UserModule {}
