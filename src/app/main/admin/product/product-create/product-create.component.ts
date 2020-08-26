import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, UrlSegment, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { fetchProduct, isProductsLoading } from 'src/app/store/products/products.selectors';
import { NgForm } from '@angular/forms';
import { addProduct, updateProduct, clearProduct } from 'src/app/store/products/products.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit, OnDestroy {

  loading = false;
  mode = 'create';

  image: File;
  imageURL: any;
  imgError = false;

  product: Product;
  imgPath = environment.imageUrl + '/products/';
  productId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.url.subscribe((url: UrlSegment[]) => {
      this.mode = url[0].path;
    });

    this.store.pipe(select(fetchProduct)).subscribe((product) => {
      if (product) {
        this.product = product;
        this.imageURL = this.imgPath + product.image;
      }
    });

    this.store.select(isProductsLoading).subscribe((status) => {
      this.loading = status;
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(clearProduct());
  }

  onSubmit(form: NgForm): void {
    this.imgError = false;
    if (form.invalid) {
      return;
    }
    if (this.imageURL === null) {
      return;
    }
    const product: Partial<Product> = form.value;
    if (this.mode === 'create') {
      if (this.image) {
        this.store.dispatch(addProduct({ product, image: this.image }));
      }
      this.store.dispatch(addProduct({ product }));
    } else {
      if (this.image) {
        this.store.dispatch(updateProduct({ productId: this.product._id, product, image: this.image }));
      }
      this.store.dispatch(updateProduct({ productId: this.product._id, product }));
    }
  }

  onUploadImage(event): void {
    this.imgError = false;
    if (this.loading) {
      return;
    }
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      const file = event.target.files[0];
      const fileSize = file.size;
      const fileType = file.type.split('/');

      // File size validation - 5MB - 5242880
      if (fileSize > 5242880) {
        this.imgError = true;
        return;
      }

      // File Type Validation
      if (fileType[0] !== 'image' && fileType[0] !== 'video') {
        this.imgError = true;
        return;
      }

      // File Preview
      reader.onload = e => {
        const url = reader.result;
        this.imageURL = url;
      };
      reader.readAsDataURL(file);

      this.image = file;
    }
  }

}
