import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base_url';
import { List_Product } from 'src/app/contracts/list_product';
import { AuthService } from 'src/app/services/common/auth.service';
import { BasketService } from 'src/app/services/common/models/basket.service';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { CustomToastrService } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private productService: ProductService,
    private fileService: FileService, private basketService: BasketService,
    private customToastrService: CustomToastrService, private router: Router, public authService: AuthService) {
    super(spinner);
  }

  totalProductCount: number;
  recentlyTotalProductCount: number;
  baseUrl: BaseUrl;
  products: List_Product[];
  recentlyProducts: List_Product[];


  async ngOnInit() {

    this.baseUrl = await this.fileService.getBaseStorageUrl();

    const data: { totalProductCount: number, products: List_Product[] } = await this.productService
      .getTopSellingProducts(
        () => {

        },
        errorMessage => {

        });


    this.products = data.products;

    this.products = this.products.map<List_Product>(p => {
      const listProduct: List_Product = {
        id: p.id,
        createdDate: p.createdDate,
        imagePath: p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase).path : "",
        name: p.name,
        price: p.price,
        stock: p.stock,
        updatedDate: p.updatedDate,
        productImageFiles: p.productImageFiles,
        description: p.description,
        categoryName: p.categoryName
      };





      return listProduct;
    });

    const recentlyData: { recentlyTotalProductCount: number, recentlyProducts: List_Product[] } = await this.productService
    .getRecentlyAddedProducts(
      () => {

      },
      errorMessage => {

      });


  this.recentlyProducts = recentlyData.recentlyProducts;
  

  this.recentlyProducts = this.recentlyProducts.map<List_Product>(p => {
    const recentlyListProduct: List_Product = {
      id: p.id,
      createdDate: p.createdDate,
      imagePath: p.productImageFiles.length ? p.productImageFiles.find(p => p.showcase).path : "",
      name: p.name,
      price: p.price,
      stock: p.stock,
      updatedDate: p.updatedDate,
      productImageFiles: p.productImageFiles,
      description: p.description,
      categoryName: p.categoryName
    };





    return recentlyListProduct;
  });

  }

  productView(product: List_Product) {
    //console.log(id);

    this.router.navigateByUrl(`productDetail/${product.id}`);
  }






}
